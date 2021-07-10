const { Wrapper } = require('vk-simple-tools');

let vk = new Wrapper({
    token: process.env.token,
    version: '5.131'
}); 

async function run() {
    let response = await vk.callMethod('users.get', {
        user_ids: 1,
        fields: 'photo_max,followers_count'
    });

    console.log(response);
};

run().catch(console.log);
