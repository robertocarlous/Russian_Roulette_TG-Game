/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { useTonAddress } from '@tonconnect/ui-react';
import { useSelector, useDispatch } from 'react-redux'; // Import the hooks
import { claimTokens } from '@/slices/faucetSlice';

const FaucetClaim = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const rawAddress = useTonAddress();

  // Access balance and claimedHistory from the Redux store
  const balance = useSelector((state: any) => state.faucet.balance);
  const claimedHistory = useSelector((state: any) => state.faucet.claimedHistory);
  
  // Get the dispatch function
  const dispatch = useDispatch();

  const handleClaim = async () => {
    if (!rawAddress) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dispatch the claimTokens action with the user's address
      dispatch(claimTokens(rawAddress));

      // Check if the claim was successful by inspecting claimedHistory
      const hasClaimed = claimedHistory.some((item: { address: string }) => item.address === rawAddress);
      if (hasClaimed) {
        toast({
          title: "Claim Failed",
          description: "You have already claimed your tokens.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Tokens claimed successfully!",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Claim error:', error);
      toast({
        title: "Claim Failed",
        description: "Failed to claim tokens. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format TON address
  const formatAddress = (address: any) => {
    if (!address) return '';
    // Keep first 6 and last 4 characters
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card className="p-6 max-w-md mx-auto bg-[#191F57]">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">TON Token Claim</h2>
          <p className="text-sm text-white">
            Claim your test tokens on TON network
          </p>
        </div>
        
        {rawAddress ? (
          <div className="space-y-4 text-white">
            <div className="text-sm">
              <p>Account Address:</p>
              <p className="font-mono text-xs break-all">
                {formatAddress(rawAddress)}
              </p>
            </div>
            <div className="text-sm">
              <p>Current Balance:</p>
              <p className="font-mono">{balance} TEST</p>
            </div>
            <div className="text-sm">
              <p>Claims History:</p>
              <p>{claimedHistory.length} claims</p>
            </div>
            <Button 
              onClick={handleClaim} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Claiming...
                </>
              ) : (
                'Claim Tokens'
              )}
            </Button>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-100">
            Please connect your wallet to claim tokens
          </div>
        )}
      </div>
    </Card>
  );
};

export default FaucetClaim;
