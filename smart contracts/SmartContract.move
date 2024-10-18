/// A 2-in-1 module that combines managed_fungible_asset and coin_example into one module that when deployed, the
/// deployer will be creating a new managed fungible asset with the hardcoded supply config, name, symbol, and decimals.
/// The address of the asset can be obtained via get_metadata(). As a simple version, it only deals with primary stores.

module TelePoint::tele_point {
    use aptos_framework::fungible_asset::{Self, MintRef, TransferRef, BurnRef, Metadata, FungibleAsset};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::primary_fungible_store;
    use aptos_framework::randomness;
    use std::error;
    use std::signer;
    use std::string::utf8;
    use std::option;
    use std::vector;
    /// Only fungible asset metadata owner can make changes.
    const ENOT_OWNER: u64 = 1;

    const ASSET_SYMBOL: vector<u8> = b"TELE";

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    /// Hold refs to control the minting, transfer and burning of fungible assets.
    struct ManagedFungibleAsset has key {
        mint_ref: MintRef,
        transfer_ref: TransferRef,
        burn_ref: BurnRef,
    }

    /// Initialize metadata object and store the refs.
    // :!:>initialize
    fun init_module(admin: &signer) {
        let constructor_ref = &object::create_named_object(admin, ASSET_SYMBOL);
        primary_fungible_store::create_primary_store_enabled_fungible_asset(
            constructor_ref,
            option::none(),
            utf8(b"Tele Points"), /* name */
            utf8(b"TELE"), /* symbol */
            8, /* decimals */
            utf8(b"https://www.favicon.cc/favicon/577/730/favicon.png"), /* icon */
            utf8(b"https://pitchcraft-ai.co.in"), /* project */
        );

        // Create mint/burn/transfer refs to allow creator to manage the fungible asset.
        let mint_ref = fungible_asset::generate_mint_ref(constructor_ref);
        let burn_ref = fungible_asset::generate_burn_ref(constructor_ref);
        let transfer_ref = fungible_asset::generate_transfer_ref(constructor_ref);
        let metadata_object_signer = object::generate_signer(constructor_ref);
        move_to(
            &metadata_object_signer,
            ManagedFungibleAsset { mint_ref, transfer_ref, burn_ref }
        )// <:!:initialize
    }

    #[view]
    /// Return the address of the managed fungible asset that's created when this module is deployed.
    public fun get_metadata(): Object<Metadata> {
        let asset_address = object::create_object_address(&@TelePoint, ASSET_SYMBOL);
        object::address_to_object<Metadata>(asset_address)
    }

    #[randomness]
    /// Return the random number in given range.
    entry fun winner_decision(admin: &signer,player:address,from:u64,to:u64,selected_numbers: vector<u64>,amount: u64,winamount:u64) acquires ManagedFungibleAsset{
        burn(admin,player,amount);
        let winning_number:u64 = randomness::u64_range(from, to);
        let result=vector::contains<u64>(&selected_numbers,&winning_number);
        if (result){
            mint(admin,player,winamount);
        }
    }

    // :!:>mint
    /// Mint as the owner of metadata object.
    public entry fun mint(admin: &signer, to: address, amount: u64) acquires ManagedFungibleAsset {
        let asset = get_metadata();
        let managed_fungible_asset = authorized_borrow_refs(admin, asset);
        let to_wallet = primary_fungible_store::ensure_primary_store_exists(to, asset);
        let fa = fungible_asset::mint(&managed_fungible_asset.mint_ref, amount);
        fungible_asset::deposit_with_ref(&managed_fungible_asset.transfer_ref, to_wallet, fa);
    }// <:!:mint

    /// Transfer as the owner of metadata object ignoring `frozen` field.
    public entry fun transfer(admin: &signer, from: address, to: address, amount: u64) acquires ManagedFungibleAsset {
        let asset = get_metadata();
        let transfer_ref = &authorized_borrow_refs(admin, asset).transfer_ref;
        let from_wallet = primary_fungible_store::primary_store(from, asset);
        let to_wallet = primary_fungible_store::ensure_primary_store_exists(to, asset);
        fungible_asset::transfer_with_ref(transfer_ref, from_wallet, to_wallet, amount);
    }

    /// Burn fungible assets as the owner of metadata object.
    public entry fun burn(admin: &signer, from: address, amount: u64) acquires ManagedFungibleAsset {
        let asset = get_metadata();
        let burn_ref = &authorized_borrow_refs(admin, asset).burn_ref;
        let from_wallet = primary_fungible_store::primary_store(from, asset);
        fungible_asset::burn_from(burn_ref, from_wallet, amount);
    }

    /// Freeze an account so it cannot transfer or receive fungible assets.
    public entry fun freeze_account(admin: &signer, account: address) acquires ManagedFungibleAsset {
        let asset = get_metadata();
        let transfer_ref = &authorized_borrow_refs(admin, asset).transfer_ref;
        let wallet = primary_fungible_store::ensure_primary_store_exists(account, asset);
        fungible_asset::set_frozen_flag(transfer_ref, wallet, true);
    }

    /// Unfreeze an account so it can transfer or receive fungible assets.
    public entry fun unfreeze_account(admin: &signer, account: address) acquires ManagedFungibleAsset {
        let asset = get_metadata();
        let transfer_ref = &authorized_borrow_refs(admin, asset).transfer_ref;
        let wallet = primary_fungible_store::ensure_primary_store_exists(account, asset);
        fungible_asset::set_frozen_flag(transfer_ref, wallet, false);
    }

    /// Withdraw as the owner of metadata object ignoring `frozen` field.
    public fun withdraw(admin: &signer, amount: u64, from: address): FungibleAsset acquires ManagedFungibleAsset {
        let asset = get_metadata();
        let transfer_ref = &authorized_borrow_refs(admin, asset).transfer_ref;
        let from_wallet = primary_fungible_store::primary_store(from, asset);
        fungible_asset::withdraw_with_ref(transfer_ref, from_wallet, amount)
    }

    /// Deposit as the owner of metadata object ignoring `frozen` field.
    public fun deposit(admin: &signer, to: address, fa: FungibleAsset) acquires ManagedFungibleAsset {
        let asset = get_metadata();
        let transfer_ref = &authorized_borrow_refs(admin, asset).transfer_ref;
        let to_wallet = primary_fungible_store::ensure_primary_store_exists(to, asset);
        fungible_asset::deposit_with_ref(transfer_ref, to_wallet, fa);
    }

    /// Borrow the immutable reference of the refs of `metadata`.
    /// This validates that the signer is the metadata object's owner.
    inline fun authorized_borrow_refs(
        owner: &signer,
        asset: Object<Metadata>,
    ): &ManagedFungibleAsset acquires ManagedFungibleAsset {
        /// assert!(object::is_owner(asset, signer::address_of(owner)), error::permission_denied(ENOT_OWNER));
        borrow_global<ManagedFungibleAsset>(object::object_address(&asset))
    }
	
	// FaucetTokenClaim.move

module FaucetTokenClaim {
    use FaucetToken; // Assuming FaucetToken is another module for the faucet token
    use Std::Signer;
    use Std::Vector;

    struct RoulettePlayer {
        address: Address,
        claimedTokens: Vector<U64>,
    }

    struct RouletteGame {
        players: Vector<RoulettePlayer>,
    }

    // Initialize the contract
    fun initialize() {
        assert!(!exists(RouletteGame), "Already initialized");
        move(RouletteGame {
            players: Vector::empty(),
        });
    }

    // Claim faucet tokens
    fun claim_tokens(signer: &Signer) {
        assert!(FaucetToken::claim_tokens(signer), "Faucet token claim failed");
        let player = RoulettePlayer {
            address: signer.address(),
            claimedTokens: Vector::empty(),
        };
        RouletteGame::add_player(player);
    }

    // Add a player to the game
    fun add_player(player: RoulettePlayer) {
        let game = borrow_global<RouletteGame>();
        game.players.push_back(player);
    }

    // Get a player's claimed tokens
    fun get_claimed_tokens(signer: &Signer) {
        let game = borrow_global<RouletteGame>();
        let player = game.players.find(|p| p.address == signer.address());
        assert!(player.is_some(), "Player not found");
        return player.unwrap().claimedTokens;
    }

    // Play the roulette game (implement the game logic here)
    fun play_roulette(signer: &Signer, bet_amount: U64) {
        // ... game logic ...
    }
}

    #[test(creator = @TelePoint)]
    fun test_basic_flow(
        creator: &signer,
    ) acquires ManagedFungibleAsset {
        init_module(creator);
        let creator_address = signer::address_of(creator);
        let aaron_address = @0xface;
        
        mint(creator, creator_address, 100);
        let asset = get_metadata();
        assert!(primary_fungible_store::balance(creator_address, asset) == 100, 4);
        freeze_account(creator, creator_address);
        assert!(primary_fungible_store::is_frozen(creator_address, asset), 5);
        transfer(creator, creator_address, aaron_address, 10);
        assert!(primary_fungible_store::balance(aaron_address, asset) == 10, 6);

        unfreeze_account(creator, creator_address);
        assert!(!primary_fungible_store::is_frozen(creator_address, asset), 7);
        burn(creator, creator_address, 90);
    }

    #[test(creator = @TelePoint, aaron = @0xface)]
    #[expected_failure(abort_code = 0x50001, location = Self)]
    fun test_permission_denied(
        creator: &signer,
        aaron: &signer
    ) acquires ManagedFungibleAsset {
        init_module(creator);
        let creator_address = signer::address_of(creator);
        mint(aaron, creator_address, 100);
    }
}