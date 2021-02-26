export = Akinator;
declare class Akinator {
    constructor(region: any, childMode: any);
    currentStep: number;
    region: any;
    uri: any;
    urlApiWs: any;
    uriObj: {
        uid: string;
        frontaddr: string;
    };
    noUri: string;
    noSession: string;
    progress: number;
    childMode: {
        childMod: boolean;
        softConstraint: string;
        questionFilter: string;
    };
    queston: string;
    answers: any[];
    /**
    * Starts the akinator session and game.
    */
    start(): Promise<void>;
    uid: string;
    frontaddr: string;
    session: any;
    signature: any;
    question: any;
    challenge_auth: any;
    /**
     * Gets the next question for the akinator session.
     * @param {BigInteger} answerId the answer to the question
     */
    step(answerId: BigInteger): Promise<void>;
    /**
     * Reverts the game back a previous step.
     */
    back(): Promise<void>;
    /**
     * The akinator attempts to make a guess and win the game.
     */
    win(): Promise<void>;
    guessCount: any;
}
