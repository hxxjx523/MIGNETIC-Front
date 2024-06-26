import bgImg from '../images/result-bg.png';
import logoimg from '../images/icons/logo.png';
import stars from '../images/stars.png';
import tipimg from '../images/icons/result-graph-tip.png';
import heartPink from '../images/heart-pink.png'
import heartBlue from '../images/heart-blue.png'

import '../css/Result.css';
import Footer from '../components/Footer';
import ResultType from '../components/ResultType';

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Result() {
    const graphRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const graphNum = ['9개', '8개', '4개', '2개'];
    // 그래프 숫자 값 전달 받기
    const graphName = ['권지수', '김수연', '김희영', '노승주'];
    // 그래프에 들어가는 친구 이름 작성
    const graphHeights = graphNum.map(num => `${parseInt(num) * 60}px`);
    const types = ['False', 'True', 'Try', 'Catch', 'Setter', 'Getter'];
    const [typeNameIndex, setTypeNameIndex] = useState(0);
    const defaultTypeNameIndex = 0; // 기본 타입 인덱스
    // 백에서 index 값 넘겨주기

    const goodFriend = "Setter";
    // 백에서 값 전달해줘야 함
    const badFriend = "Getter";
    // 백에서 값 전달

    useEffect(() => {
        let interval;
        let timeout;
        let remainingTime = 3000; // 총 시간 (밀리초 단위)
        const intervalStep = 200;
        let intervalDuration = intervalStep;

        const updateInterval = () => {
            if (remainingTime <= 1000) {
                intervalDuration = 500; // 1초 남았을 때 속도를 500ms로 느리게
            } else {
                intervalDuration = intervalStep;
            }
        };

        const startInterval = () => {
            interval = setInterval(() => {
                setTypeNameIndex(prevIndex => {
                    const nextIndex = prevIndex + 1;
                    return nextIndex < types.length ? nextIndex : 0;
                });
                remainingTime -= intervalDuration;
                updateInterval();
                clearInterval(interval);
                startInterval();
            }, intervalDuration);
        };

        startInterval();

        timeout = setTimeout(() => {
            clearInterval(interval);
            setTypeNameIndex(defaultTypeNameIndex); // 고정값으로 변경
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [defaultTypeNameIndex, types.length]);

    const typeName = types[typeNameIndex];

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = graphRefs.findIndex(ref => ref.current === entry.target);
                if (index !== -1) {
                    requestAnimationFrame(() => {
                        entry.target.style.height = graphHeights[index];
                        entry.target.style.transition = 'height 1s ease';
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
        graphRefs.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            graphRefs.forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    useEffect(() => {
        document.body.style.backgroundImage = `url(${bgImg})`;
        document.body.style.backgroundAttachment = 'scroll';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
    }, []);

    const navigate = useNavigate();

    const handleTest = () => {
        navigate('/testselect');
    };
    const handleHotPlace = () => {
        navigate('/hotplace');
    };



    return (
        <div className='result'>
            <img src={logoimg} className="logoimg" />
            <div className='result-container'>
                <div className='type-container'>
                    <div className='your-type your-type-first'>
                        <p>당신의 타입은...</p>
                    </div>
                    <div className='type-name-stars'>
                        <img src={stars} className="stars stars-first" />
                        <div className='type-name'>
                            <p className='type-name-main'>{typeName}</p>
                        </div>
                        <img src={stars} className="stars stars-end" />
                    </div>
                    <div className='your-type your-type-end'>
                        <p>입니다</p>
                    </div>
                </div>
                <div className='type-description'>
                    <div className='type-li-container'>
                        <li className='type-li'>여기는 타입의 설명을 쭉 쓰기 <br></br>
                            여기는 타입의 설명을 쭉 쓰기 여기는 타입의 설명을 쭉 쓰기 <br></br>
                            여기는 타입의 설명을 쭉 쓰기 여기는 타입의 설명을 쭉 쓰기 <br></br>
                            여기는 타입의 설명을 쭉 쓰기 여기는 타입의 설명을 쭉 쓰기  <br></br>
                            여기는 타입의 설명을 쭉 쓰기
                        </li>
                        <li className='type-li'>여기는 타입의 설명을 쭉 쓰기 <br></br>
                            여기는 타입의 설명을 쭉 쓰기 여기는 타입의 설명을 쭉 쓰기 <br></br>
                            여기는 타입의 설명을 쭉 쓰기 여기는 타입의 설명을 쭉 쓰기 <br></br>
                            여기는 타입의 설명을 쭉 쓰기 여기는 타입의 설명을 쭉 쓰기  <br></br>
                            여기는 타입의 설명을 쭉 쓰기
                        </li>
                    </div>
                    <div className='good-bad-friend-type'>
                        <div className='good-bad-friend-type-container'>
                            <p className='good-bad-friend good-friend'>잘 맞는 유형</p>
                            <div className='friend-type good-friend-type'>
                                <img src={heartPink} className='heart heart-pink' />
                                <div className='type-name'>
                                    <p className='type-name-friend-good-bad'>{goodFriend}</p>
                                </div>
                                <p className='type-good-bad-description'>간단한 한줄 설명</p>
                                <p className='type-details good-type-details'>
                                    유형설명설명설명<br></br>
                                    유형설명설명설명<br></br>
                                    유형설명설명설명<br></br>
                                </p>
                            </div>
                        </div>
                        <div className='good-bad-friend-type-container'>
                            <p className='good-bad-friend good-friend'>안 맞는 유형</p>
                            <div className='friend-type bad-friend-type'>
                                <img src={heartBlue} className='heart heart-blue' />
                                <div className='type-name '>
                                    <p className='type-name-friend-good-bad type-name-friend-blue'>{badFriend}</p>
                                </div>
                                <p className='type-good-bad-description'>간단한 한줄 설명</p>
                                <p className='type-details bad-type-details'>
                                    유형설명설명설명<br></br>
                                    유형설명설명설명<br></br>
                                    유형설명설명설명<br></br>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='finding-friend-graph'>
                        <div className='finding-friend'>
                            <div className='similar-friend'>
                                <p>나와 비슷한 친구</p>
                            </div>
                            <div className='same-answers'>
                                <p>(10개 중 같은 답을 선택한 개수)</p>
                            </div>
                        </div>
                        <div className='friend-graph-name-container'>
                            <div className='friend-graph-container'>
                                {graphRefs.map((ref, index) => (
                                    <div className={`friend-graph friend-graph-${index + 1}`} key={index}>
                                        <p className={`answer answer-num-${index + 1}`}>{graphNum[index]}</p>
                                        <Link to='/letterwrite'>
                                            <div className={`graph graph-${index + 1}`} ref={ref}></div>
                                        </Link>
                                        <p className={`friend-name friend-name-${index + 1}`}>{graphName[index]}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='friend-graph-bg'></div>
                        </div>
                    </div>
                    <div className='graph-tip'>
                        <img src={tipimg} className="tip-img" />
                        <p className='tip-text'>
                            그래프를 클릭하면 그 친구에게 <br></br>
                            편지를 쓸 수 있어요!
                        </p>
                    </div>
                    <div className='type-description-bg'></div>
                </div>
                <div className='btn-container'>
                    <button className='retry-btn' onClick={handleTest}>검사 다시하기</button>
                    <button className='hotplace-btn' onClick={handleHotPlace}>친구와 핫플 보기</button>
                </div>
            </div>
            <div className='footer'>
                <Footer position={"result"} />
            </div>
        </div>
    );
}

export default Result;