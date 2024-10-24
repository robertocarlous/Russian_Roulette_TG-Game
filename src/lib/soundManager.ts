// utils/soundManager.ts
import soundplay from "../../src/assets/mixkit-epic-orchestra-transition-2290 (1).wav"
import soundwin from "../../src/assets/2013-preview.mp3"
interface SoundCollection {
    [key: string]: HTMLAudioElement;
}

type SoundName = 'spin' | 'win';

class SoundManager {
    private sounds: SoundCollection;

    constructor() {
        this.sounds = {
            spin: new Audio(soundplay),
            win: new Audio(soundwin)
        };
        
        // Preload all sounds
        Object.values(this.sounds).forEach(sound => sound.load());
    }

    play(soundName: SoundName): void {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }

    stop(soundName: SoundName): void {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    stopAll(): void {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}

export const soundManager = new SoundManager();