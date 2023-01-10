import httpRequest from '@/utils/request';

export function apiGetEntityFields(param) {
    return httpRequest({
        url: '/getEntityFields',
        method: 'post',
        data: param
    })
}

export function apiGetTableData(param) {
    return httpRequest({
        url: '/getTableData',
        method: 'post',
        data: param
    })
}

export function apiGetDictByKeys(param) {
    return httpRequest({
        url: '/getEntityColumn',
        method: 'post',
        data: param
    })
}

export function apiGetCascadeOptionsForNeuralTree(param){
    return httpRequest({
        url: '/getCascadeOptions',
        method:'post',
        data: param
    })
}

export function apiGetNeuralTreeDescription(param){
    return httpRequest({
        url: '/getDescription',
        method:'post',
        data: param
    })
}