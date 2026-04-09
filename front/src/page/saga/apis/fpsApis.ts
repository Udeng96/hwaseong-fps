import {LastParam, TimeParam, VisitorParam} from "../../../config/interface/fpsInterface";
import config from "../../../config/config";
import {xhr} from "../../../config/xhr";
import {useParams} from "react-router-dom";

export const fetchStayTime = async(params : TimeParam) => {
    const {data} = await xhr.get(config.API.API.FPS.URL_FPS.STAY_TIME,{params : params});

    return data;
}

export const fetchRegionList = async () => {
    const {data} = await xhr.get(config.API.API.FPS.URL_FPS.REGION_LIST);
    return data;
}

export const fetchVisitorCountList = async (params: VisitorParam) => {
    const {data} = await xhr.get(config.API.API.FPS.URL_FPS.VISITOR_COUNT, {params: params});
    return data;
}

// export const fetchLatestVisitorCountList = async (params: string) => {
//     const {data} = await xhr.get(config.API.API.FPS.URL_FPS.VISITOR_COUNT, {
//         params: {
//             latest: params
//         }
//     });
//     return data;
// }

export const fetchLastVisitorCountList = async (params: string) => {
    const {data} = await xhr.get(config.API.API.FPS.URL_FPS.VISITOR_ANALYTIC, {params: {type: params}});
    return data;
}

export const fetchMigrationList = async (params: TimeParam) => {
    const {data} = await xhr.get(config.API.API.FPS.URL_FPS.MIGRATION, {params: params})
    return data;
}

export const fetchExcelDownload = async () => {
    try {
        const response = await xhr.post(config.API.API.FPS.URL_FPS.EXCEL_DOWNLOAD,"",{responseType : 'blob'})

        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]))

            const currentDate = new Date()
            const formattedDate = currentDate.toISOString().split('T')[0]
            const filename = `화성 병점 위치별 방문객 수 통계_${formattedDate}.xlsx`
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    } catch (error) {
        console.error('Error occurred while downloading the Excel file:', error)
    }
}