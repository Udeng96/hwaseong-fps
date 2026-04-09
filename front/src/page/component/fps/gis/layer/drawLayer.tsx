import {useSelector} from "react-redux";
import {Circle, Polygon, Polyline, useMap, useMapEvent} from "react-leaflet";
import {RootState} from "../../../../store/rootStore";
import {GIS_FUNC_MODE} from "../../../../../config/const/fpsConst";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import L, {LatLng} from "leaflet";
import 'leaflet-geometryutil';
import * as turf from '@turf/turf';


const DrawLayer = () => {

    const map = useMap();

    // tooltip을 띄우기 위한 ref
    // react 에서는 dom 에 접근하지 않는 것이 원칙 (따라서 querySelector등을 쓰지 않는다.)
    // react 에서 dom 에 접근하기 위해 사용하는 것이 useRef();
    const tooltipRef = useRef();
    const polygonRef: MutableRefObject<any> = useRef();
    const polylineRef: MutableRefObject<any> = useRef();

    // 활성화 된 지도 기능
    const gisMode = useSelector((state: RootState) => state.view.fpsGis.gisFuncMode);

    // polyline
    const [linePositions, setLinePositions] = useState<LatLng[]>([]);
    const [polyline, setPolyline] = useState<any>();
    const [distanceTooltip, setDistanceTooltip] = useState<string | null>();

    // polygon
    const [gonPositions, setGonPositions] = useState<LatLng[]>([]);
    const [polygon, setPolygon] = useState<any>();
    const [areaTooltip, setAreaTooltip] = useState<string | null>();

    // circle (radius)
    const [circlePositions, setCirclePositions] = useState<LatLng | null>();
    const [circle, setCircle] = useState<any>();

    // 마우스를 따라 이동하는 tooltip
    const [tooltipContent, setTooltipContent] = useState<string | null>(); // 툴팁에 표시할 내용

    // 현재 draw 여부
    const [isDrawing, setIsDrawing] = useState(false);


    // polyline 총 길이 계산
    const calculateDistance = () => {
        let allDistance = 0;

        linePositions.map((line, index) => {
            if (index > 0) {
                const prev = L.latLng(linePositions[index - 1]);
                const current = L.latLng(linePositions[index]);
                const distance = prev.distanceTo(current);

                allDistance += distance;
            }

        })

        let result = (allDistance / 1000).toFixed(2); //m -> km

        return result.toString();
    }

    // polygon 총 면적 계산
    const calculateArea = () => {

        if (polygon) {
            if (polygonRef.current) { // polyline이 null 인 경우도 있기 때문에 검사해줘야 한다.

                const polygons = polygonRef.current;
                const latLngs = polygons.getLatLngs()[0];

                //@ts-ignore
                const coordinates = latLngs.map(latLng => [latLng.lng, latLng.lat]);

                // polygon의 면적을 계산할 때는 시작점과 끝점을 동일하게 해줘야 하는데, 해당 작업이 되어있질 않다.(esc를 누르면 끝나기 때문에)
                // 따라서 시작점과 종료점을 동일하게 만드는 작업이 필요하다.
                if (coordinates.length > 1) {
                    const firstLatLng = coordinates[0];
                    const lastLatLng = coordinates[latLngs.length - 1];
                    if (firstLatLng[0] !== lastLatLng[0] || firstLatLng[1] !== lastLatLng[1]) {
                        coordinates.push(firstLatLng); // 시작점과 종료점을 동일하게 만든다.
                    }
                }
                const polygonGeoJson = turf.polygon([coordinates])
                const area = turf.area(polygonGeoJson);
                const areaInSquareMeters = Math.round(area * 100) / 100; // m^2으로 계산
                const areaInSquareKilometers = (areaInSquareMeters / 1000000).toFixed(2); // m^2 -> km^2

                return areaInSquareKilometers;

            }

        }

    }


    // 총면적을 나타내주는 면적 tooltip
    useEffect(() => {

        if (polygonRef.current) {

            let areaTip: L.Tooltip;

            if (areaTooltip) { // areaTooltip이 null 이 아닌 경우
                areaTip = L.tooltip({
                    permanent: false, // permanent 속성 제거
                    interactive: true,
                    offset: [0, -30], // y축으로 약간 위로 이동
                    direction: 'bottom', // 툴팁 방향 설정
                    className: 'area-custom-tooltip', // CSS 클래스 추가 (나중에 해당 레이어만 지워주기 위해 필요)
                }).setContent('총 면적 : ' + areaTooltip);

                const polygon = polygonRef.current;
                const centerLatLng = polygon.getBounds().getCenter(); // polygon의 중심좌표

                areaTip.setLatLng(centerLatLng).openOn(map); // tooltip 표시


            } else {
                map.eachLayer((l) => {
                    //@ts-ignore
                    if (l.options.className === "area-custom-tooltip") {
                        // map에 표시되어있는 전체 layer를 가져온다.
                        // 따라서 삭제하고자 하는 레이어만 구분하여 삭제해줘야한다.
                        map.removeLayer(l);
                    }
                })
            }
        }

    }, [areaTooltip])


    // 총 거리를 나타내주는 tooltip (위와 동일)
    useEffect(() => {

        if (polylineRef.current) {
            let distanceTip: L.Tooltip;

            if (distanceTooltip) {

                // polyline 의 중간좌표 구하기.
                const polylineCurrent = polylineRef.current;
                const latLngs = polylineCurrent.getLatLngs();
                const midIndex = Math.floor(latLngs.length / 2);
                const midPointLatLng = latLngs[midIndex];

                distanceTip = L.tooltip({
                    permanent: false, // permanent 속성 제거
                    interactive: true,
                    offset: [0, 10], // y축 이동
                    direction: 'bottom', // 툴팁 방향 설정
                    className: 'distance-custom-tooltip', // CSS 클래스 추가
                }).setContent('총 길이 : ' + distanceTooltip);
                distanceTip.setLatLng(midPointLatLng).openOn(map);

            } else {

                map.eachLayer((l) => {

                    //@ts-ignore
                    if (l.options.className === 'distance-custom-tooltip') {
                        map.removeLayer(l);
                    }
                })
            }
        }


    }, [distanceTooltip])


    // mouse를 따라 움직이는 tooltip 표기
    useEffect(() => {
        let tooltip: L.Tooltip;

        if (tooltipContent) {
            tooltip = L.tooltip({
                permanent: false, // permanent 속성 제거
                interactive: true,
                offset: [0, -30], // 마커 위에 표시하기 위해 y축으로 약간 위로 이동
                direction: 'top', // 툴팁 방향 설정
                className: 'custom-tooltip', // CSS 클래스 추가
            }).setContent(tooltipContent);

            // 마우스 이동 이벤트 핸들러 등록
            map.on('mousemove', handleMouseMove);

            // @ts-ignore
            tooltipRef.current = tooltip;

            return () => {
                // 컴포넌트 언마운트 시 이벤트 핸들러와 툴팁 제거
                // 해당 작업을 해주지 않으면 mouse가 움직이는 곳마다 tooltip이 생겨난다.
                map.off('mousemove', handleMouseMove);
                if (tooltip) {
                    tooltip.remove();
                }
            };
        }
        // 마우스 이동 이벤트 핸들러 정의
        // 마우스 위치에 tooltip을 열어준다.
        function handleMouseMove(e: L.LeafletMouseEvent) {
            if (tooltip) {
                tooltip.setLatLng(e.latlng).openOn(map);
            }
        }
    }, [tooltipContent]);


    // map event
    // map 에서 첫번째 인자 type의 이벤트가 발생할 경우 두번째 인자의 함수가 실행된다.

    useMapEvent('click', function (e) {


        if (gisMode === GIS_FUNC_MODE.L) { // polyline의 기능이 활성화 되어 있는 경우

            let newPositions = [...linePositions]; // 원래 그려져있던 지점들 가져오고

            if (isDrawing) {
                setTooltipContent(`'esc'키를 누르면 종료됩니다.`); // tooltip 내용 변경하고
                newPositions.push(e.latlng); // 클릭하면 새로운 지점 추가
                setLinePositions(newPositions) // 반영
            }
        } else if (gisMode === GIS_FUNC_MODE.G) { // Polygon 기능이 활성화

            let newGonPositions = [...gonPositions]; // 원래 그려져있던 지점들 가져오고

            if (isDrawing) {
                setTooltipContent(`'esc'키를 누르면 종료됩니다.`); // tooltip 내용 변경하고
                newGonPositions.push(e.latlng); // 클릭하면 새로운 지점 추가
                setGonPositions(newGonPositions);
            }
        } else if (gisMode === GIS_FUNC_MODE.R) { // Circle 기능이 활성화
            if (isDrawing) {
                setCirclePositions(e.latlng);
                setTooltipContent(`확인하고 싶은 장소를 클릭하세요`);
            }
        }
    })

    //마우스가 움직일 때 다음 지점까지의 위치를 표시해주는 코드
    useMapEvent('mousemove', function (e) {
        if (isDrawing) {
            if (gisMode === GIS_FUNC_MODE.L) {
                setLinePositions((prevPositions) => [...prevPositions.slice(0, -1), e.latlng])
            } else if (gisMode === GIS_FUNC_MODE.G) {
                setGonPositions((prevPositions) => [...prevPositions.slice(0, -1), e.latlng])
            }
        }
    })


    // keyboard 이벤트
    useMapEvent('keydown', function (event) {

        if (isDrawing) {
            if (gisMode === GIS_FUNC_MODE.L) {
                if (event.originalEvent.key === "Escape") { // ESC 키를 누를 경우
                    if (linePositions.length > 2) { // 아직 drawing 중일 경우
                        setIsDrawing(false); // drawing 종료
                        setTooltipContent('esc 키를 한 번 더 누르면 초기화 됩니다.'); // tooltip 내용 변경
                        setLinePositions((prevPositions) => [...prevPositions.slice(0, -1)]) //mouse를 따라 다음 거리까지 표기 되기 때문에 클릭한 지점까지로 바꿔줘야 한다.
                        let allDistance = calculateDistance();
                        setDistanceTooltip(allDistance + 'km'); // distance 표기
                    }else{
                        setTooltipContent('지점을 두 곳 이상 입력해주세요.')
                    }
                }
            } else if (gisMode === GIS_FUNC_MODE.G) {
                if (event.originalEvent.key === 'Escape') {
                    if (gonPositions.length<4){
                        setTooltipContent('지점을 세 곳 이상 입력해주세요.');
                    }else{
                        setIsDrawing(false);
                        setTooltipContent('esc 키를 한 번 더 누르면 초기화 됩니다.');
                        setGonPositions((prevPositions) => [...prevPositions.slice(0, -1)])
                        let polygonArea = calculateArea(); //면적을 계산하고.

                        setAreaTooltip(polygonArea + 'km²');
                    }
                    // if (gonPositions.length >= 3) {
                    //     setIsDrawing(false);
                    //     setTooltipContent('esc 키를 한 번 더 누르면 초기화 됩니다.');
                    //     setGonPositions((prevPositions) => [...prevPositions.slice(0, -1)])
                    //     let polygonArea = calculateArea(); //면적을 계산하고.
                    //
                    //     setAreaTooltip(polygonArea + 'km²');
                    //
                    //
                    // }
                }
            }
        } else { // drawing = false 상태에서 다시 ESC를 누를 경우
            setAreaTooltip(null); // 초기화
            setDistanceTooltip(null); // 초기화
            setTooltipContent(`클릭하면 그리기가 시작됩니다`)
            setIsDrawing(true); // 다시 그리기 모드로 전환
            setLinePositions([]); // line 초기화
            setGonPositions([]);  // gon 초기화
        }

    })

    // 그리기 이벤트 생성
    // polyline 생성
    useEffect(() => {

        if (linePositions.length > 0) {
            setPolyline(<Polyline positions={linePositions} color={'#ff6f26'} weight={4} opacity={1}
                                  ref={polylineRef}/>)
        } else {
            setPolyline(null);
        }

    }, [linePositions])


    // polygon 생성
    useEffect(() => {
        if (gonPositions.length > 0) {
            setPolygon(<Polygon className={'gon'} positions={gonPositions} color={'#ff6f26'} fillColor={'#000000'}
                                fillOpacity={0.3} ref={polygonRef}/>)
        } else {
            setPolygon(null);
        }
    }, [gonPositions])


    // circle 생성
    useEffect(() => {
        if (circlePositions) {
            setCircle(<Circle center={circlePositions} radius={2000} color={'#ff6f26'} fillColor={'#000000'}
                              fillOpacity={0.3}/>)
        } else {
            setCircle(null);
        }
    }, [circlePositions])


    // active 된 mode 변경된 경우
    useEffect(() => {



        //일단 그려져 있는 것 전부 초기화
        setLinePositions([]); // line 초기화
        setGonPositions([]); // gon 초기화
        setCirclePositions(null); //circle 초기화

        // 아무것도 활성화 안되어 있는 경우
        if (gisMode === GIS_FUNC_MODE.N) {

            map.eachLayer((l) => {
                if (l.options.pane === 'drawLayer'){
                    map.removeLayer(l);
                }
            })

            setIsDrawing(false); // 그리기 모드 종료
            setTooltipContent(null); // tooltip 삭제
        }

        // polyline
        if (gisMode === GIS_FUNC_MODE.L) {
            setIsDrawing(true); // 그리기 모드
            setTooltipContent("클릭하면 그리기가 시작됩니다");
        }

        // polygon
        if (gisMode === GIS_FUNC_MODE.G) {
            setIsDrawing(true); //  그리기 모드
            setTooltipContent("클릭하면 그리기가 시작됩니다");

        }

        // circle
        if (gisMode === GIS_FUNC_MODE.R) {
            setIsDrawing(true);  // 그리기 모드
            setTooltipContent("확인하고자 하는 위치를 클릭해주세요.");

        }

    }, [gisMode])

    // mode에 따라 rendering
    return (

        <>
            {
                gisMode === GIS_FUNC_MODE.L ? polyline :
                    gisMode === GIS_FUNC_MODE.G ? polygon :
                        gisMode === GIS_FUNC_MODE.R ? circle :
                            ''
            }
        </>

    );


}

export default DrawLayer;