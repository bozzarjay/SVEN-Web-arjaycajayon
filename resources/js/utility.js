import axios from 'axios';
const appURL = localStorage.getItem('api');

const SubmitSchedule = async (data) => {
    return new Promise(async (resolve, reject) => {
        await axios.post(`${appURL}/add/schedule_visit`,  data).then(e => {
            resolve(e.data);
        }).catch(e => {
            reject(e.data);
        });
    })
}

export {
    SubmitSchedule,
}