import { get, post } from '@/utils/http'

const root =  process.env.NODE_ENV=="development" ?  '/api':  'https://api.dsdatas.com/q';

export function getTest(params){
    return post(`${root}/user/list`, params);
}
