export = getSession;
/**
 * gets the session uid and frontaddr needed to play the game.
 * @returns {Promise<{uid: string, frontaddr: string}>}
 */
declare function getSession(): Promise<{
    uid: string;
    frontaddr: string;
}>;
