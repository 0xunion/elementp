export const get_region = (position_code: string) => new Promise((resolve, reject) => {
    let api = `https://geo.datav.aliyun.com/areas_v2/bound/geojson?code=${position_code}_full`
    fetch(api)
        .then(res => res.json())
        .then(res => {
            resolve(res)
        }
        )
        .catch(err => {
            reject(err)
        }
    )
})