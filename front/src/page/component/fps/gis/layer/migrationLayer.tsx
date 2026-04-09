import {useMap} from "react-leaflet";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet.migration';
import {MigrationData, MigrationType} from "../../../../../config/interface/fpsInterface";
import {MIGRATION_OPTION, RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";

const MigrationLayer = () => {

    const map = useMap();

    const activeMenu = useSelector((state:RootState)=>state.view.fpsRight.activeMenu);

    const filterFromStdList = useSelector((state:RootState) => state.view.fpsRight.fromFloatingList);
    const filterToFromStdList  = useSelector((state:RootState)=> state.view.fpsRight.toFloatingList);
    const migrationLayerRef :MutableRefObject<any> = useRef<any>();

    const [migrationList, setMigrationList] = useState<MigrationData[]>([]);
    const [mapMigrationLayer, setMapMigrationLayer] = useState<any>(null);

    //@ts-ignore
    let migrationLayer = L.migrationLayer([], MIGRATION_OPTION);

    useEffect(()=>{

        let newMigrationList : MigrationData[] = [];

        filterFromStdList.map((data) => {
            let migrationData : MigrationData = {
                from : data.fromRegion,
                to : data.stdRegion,
                fromGis : [data.fromX, data.fromY],
                toGis : [data.stdX, data.stdY],
                count : data.fromCount
            }

            newMigrationList.push(migrationData);
        })

        filterToFromStdList.map((data)=>{
            let migrationData : MigrationData = {
                from : data.stdRegion,
                to : data.toRegion,
                fromGis : [data.stdX, data.stdY],
                toGis : [data.toX, data.toY],
                count : data.toCount
            }

            newMigrationList.push( migrationData);
        })

        setMigrationList(newMigrationList);

    },[filterFromStdList, filterToFromStdList])



    const setColor = (_data:number) => {
        if (_data < 100) {
            return "#3febe5";
        } else if (_data >= 100 && _data < 500) {
            return "#3096fc";
        } else if (_data >= 500 && _data < 1000) {
            return "#7a45ff";
        } else if (_data >= 1000 && _data < 5000) {
            return "#bd36f7";
        } else {
            return "#ff45da";
        }
    }


    const makeLayer = () => {

        let layerData  : MigrationType[] = [];

        migrationList.map((data)=>{
            let migrationData : MigrationType = {
                from : data.fromGis,
                to : data.toGis,
                labels : [data.from, data.to],
                color : setColor(Number(data.count)),
                value : data.count.toString(),
            }

            layerData.push(migrationData);
        }) 

        //@ts-ignore
        let migrationLayer = L.migrationLayer(layerData, MIGRATION_OPTION);

        setMapMigrationLayer(migrationLayer);

        migrationLayerRef.current = migrationLayer.addTo(map);



        return migrationLayer;
    }
    
    useEffect(() => {

        if (mapMigrationLayer){
            map.removeLayer(mapMigrationLayer);

        }
        setMapMigrationLayer(null);

        if (migrationList.length>0 && activeMenu === RIGHT_ACTIVE_MENU.F ){
            makeLayer();

        }


    },[migrationList, activeMenu])

    return null;

}

export default MigrationLayer;