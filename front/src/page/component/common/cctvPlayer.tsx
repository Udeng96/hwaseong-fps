import XeusGate from "../../../external/xeus.player.2.1.0";
import {PLAYER_ID_PREFIX, STREAM_URL} from "../../../config/config";
import {CctvData} from "../../../config/interface/commonInterface";
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootStore";
import {useEffect, useState} from "react";

const CctvPlayer = (props: { playCctv: CctvData, isPtz: boolean }) => {


    let playerId = PLAYER_ID_PREFIX + props.playCctv.facId;

    // cctv 재생되는 숫자
    const reloadCnt = useSelector((state: RootState) => state.view.common.reloadCnt);


    // 이게 div (이걸로 인해 player가 생성된다.)
    const [player, setPlayer] = useState(null);

    // 재생되는 player가 있으면 한 번 껐다가 다시 재생해야한다.

    useEffect(() => {
        return () => {
            // @ts-ignore
            player?.destroy()
        }
    }, [player])

    // mgrNo가 바뀌면 다시 생성하고 시작한다.
    useEffect(() => {

        if (props.playCctv) {
            makePlayerAndStart();
        } else {
            setPlayer(null);
        }

    }, [props.playCctv, props.isPtz])


    useEffect(() => {
        if (reloadCnt > 0) {
            makePlayerAndStart(); // 에러가 발생할 경우 다시 reload한다.
        }
    }, [reloadCnt])

    const makePlayerAndStart = () => {

        // @ts-ignore
        if (player && player.destroy) {// 재생중이 영상이 있으면
            // @ts-ignore
            setPlayer(null);
        }

        let streamUrl = STREAM_URL;


        // @ts-ignore
        //얘는 기본 설정.
        //playerId, cctvMgrNo, url은 무조건 있어야 한다.
        let xeusPlayer = new XeusGate.Player({

            playerId: playerId,
            cctvMgrNo: props.playCctv.mgrNo,
            timestamp: '',
            debug: false,
            url: streamUrl,
            userId: 'tester1',
            speed: '',
            codec: 'h264',

        });

        //재생시킬 player를 생성한다.
        setPlayer(xeusPlayer);


    }

    return (

        <div id={playerId} style={{width: "100%", height: "100%", position: "absolute"}}/>
    )


}
export default CctvPlayer;