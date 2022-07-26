import NextInfo from "../chunk/info/next/info";
import RunnerInfo from "../chunk/info/runner/info";

export type TimingFunction = (timeFraction: number) => number;

export type AnimationNextFunction = (info: NextInfo, progress: number) => void;
export type AnimationRunnerFunction = (info: RunnerInfo, progress: number) => void;
export type AnimationFunction = (info: RunnerInfo | NextInfo, progress: number) => void;

export type AnimationNextArrayObject = { progress: number; timing?: TimingFunction; draw: AnimationNextFunction };
export type AnimationRunnerArrayObject = { progress: number; timing?: TimingFunction; draw: AnimationRunnerFunction };

export type AnimationNextArray = Array<AnimationNextArrayObject>;
export type AnimationRunnerArray = Array<AnimationRunnerArrayObject>;
export type AnimationArray = Array<AnimationRunnerArrayObject | AnimationNextArrayObject>;

export type AnimationNext = AnimationNextArray | AnimationNextFunction;
export type AnimationRunner = AnimationRunnerArray | AnimationRunnerFunction;
export type AnimationRunnerNext = AnimationNext | AnimationRunner;

export type SimpleFunction = () => void;
export type MutationFunction = (item: HTMLElement) => void;
