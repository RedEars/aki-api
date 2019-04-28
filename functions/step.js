const request = require('request-promise');
const url = require("./getURL.js");

/**
 * gets a step for aki by requesting the correct data.
 * @param region the supplied region area.
 * @param session
 * @param signature
 * @param answerId the answer that resembles the question
 * @param step the number of step this is on.
 * @param callback the callback if provided one.
 */
module.exports = async (region, session, signature, answerId, step, callback) => {
    const id = url.regionURL(region);

    const opts = {
        method: 'GET',
        json: true,
        uri: `https://${id}/ws/answer?session=${session}&signature=${signature}&step=${step}&answer=${answerId}`,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
        },
        gzip: true
    }

    //get the json data, and await it
    const json = await request(opts).catch(console.error);

    return new Promise( (resolve, reject) => {
        if (json.completion === 'OK') {
            try {
                resolve(jsonComplete(json, step));
            } catch (e) {
                console.error(e);
                reject(json);
            }
        } else if (json.completion === 'KO - SERVER DOWN') {
            reject(`Akinator servers are down for the "${region}" region. Check back later.` + json.completion);
        } else if (json.completion === 'KO - TECHNICAL ERROR') {
            reject(`Akinator's servers have had a technical error for the "${region}" region. Check back later.` + json.completion);
        } else if (json.completion === 'KO - INCORRECT PARAMETER') {
            reject(`You inputted a wrong paramater, this could be session, region, or signature.` + json.completion);
        } else if (json.completion === 'KO - TIMED OUT') {
            reject('Your Akinator session has timed out.' + json.completion);
        } else {
            reject('Unknown error has occured. Server response: ' + json.completion);
        }
    });
}


/**
 * parses out the json info
 * @param json the json information from the request
 * @param step the step akinator is working on.
 */
function jsonComplete(json, step) {
    let ans = []
    for (let i = 0; i < json.parameters.answers.length; i++) {
        ans.push(json.parameters.answers[i].answer);
    }
    
    return {
        "nextQuestion": json.parameters.question,
        "progress": json.parameters.progression,
        "answers": ans,
        "currentStep": step,
        "nextStep": step+1
    };
}
