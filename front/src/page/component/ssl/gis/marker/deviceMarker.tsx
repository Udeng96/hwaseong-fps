import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {actions} from "../../../../saga/actions/sslActions";
import L, {LatLng} from "leaflet";
import ReactDOMServer from "react-dom/server";
import {DeviceResponseData} from "../../../../../config/interface/sslInterface";
import {useMap} from "react-leaflet";
import {updateActiveDevice, updateActiveListDevice} from "../../../../store/view/ssl/sslViewStore";

const DeviceMarker = () => {
    const dispatch = useDispatch();
    const isCctvMarkerOn = useSelector((state: RootState) => state.view.sslGis.isActiveCctvMarker)
    const deviceList = useSelector((state:RootState)=>state.server.sslRight.deviceResponse)
    const activeDeviceList = useSelector((state : RootState)=>state.view.sslRight.activeDeviceList)
    const deviceActive = useSelector((state : RootState)=>state.view.sslRight.activeDevice)
    const map = useMap();
    // const [activeMarker, setActiveMarker] = useState<boolean>(false)

    const renderIcon = (device : DeviceResponseData) => {
        return L.divIcon({
            className: 'event_custom_icon',
            html: ReactDOMServer.renderToString(
                <div className={`gis__icon--smart ${device.dvcId === deviceActive?.dvcId || device.dvcId === activeDeviceList?.dvcId ?'active' : ''}`}/>
            ),
            iconAnchor: [30, 30]
        })
    }

    const makeMarker = (device: DeviceResponseData) => {
        const deviceMarker = L.marker(new LatLng(Number(device.lat), Number(device.lng)), {
            icon: renderIcon(device),
            pane: 'deviceMarker',
            //@ts-ignore
            deviceData: device,
            active: false,
        })

        deviceMarker.on('click', clickedMarker)

        return deviceMarker
    }

    useEffect(() => {
        map.eachLayer((l) => {
            //@ts-ignore
            if (l.options.deviceData) {
                map.removeLayer(l);
            }
        })

        if (deviceList.length > 0 && !isCctvMarkerOn) {
            deviceList.map((device) => {
                let marker = makeMarker(device);
                map.addLayer(marker);
            })
        }

    }, [deviceList, deviceActive, activeDeviceList, isCctvMarkerOn])

    const clickedMarker = (e : any) => {
        let data = e.target.options.deviceData
        if(data.dvcId === deviceActive?.dvcId){
            dispatch(updateActiveDevice(null))
        } else {
            dispatch(updateActiveListDevice(null))
            dispatch(updateActiveDevice(data))
        }
    }

    return null;

}
export default DeviceMarker