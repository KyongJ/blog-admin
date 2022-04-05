import { useEffect, useRef } from 'react';

const useImageLazy = (domList: RefType, threshold = [0],deps:number[]=[]) => {
    // const [scrollChange, setScrollChange] = useState(0);

    // const getLoad = () => {
    //     const clienetHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     domList.forEach((item: any) => {
    //         const { top } = item.getBoundingClientRect();
    //         if (!item.dataset.src) return;
    //         if (top < clienetHeight + scrollTop) {
    //             let img = item.querySelector('img');
    //             img.src = item.dataset.src;
    //             // console.log(item.dataset.src);
    //             // console.log('top',top);
    //             item.removeAttribute('data-src');
    //         }
    //     });
    // };

    // useEffect(() => {
    //     const tick = () => {
    //         setScrollChange(scrollChange => scrollChange + 1);
    //     };

    //     document.addEventListener('scroll', tick);
    //     getLoad();
    //     tick()
    //     return () => {
    //         document.removeEventListener('scroll', tick);
    //         cancel();
    //     };
    // }, []);

    // const [cancel] = useThrottle(
    //     () => {
    //         getLoad();
    //         console.log('scrollChange',scrollChange);
    //         console.log(new Date())
    //     },
    //     1000,
    //     [scrollChange]
    // );
    const ioRef = useRef<RefType>();
    useEffect(() => {
        ioRef.current = new IntersectionObserver(
            entries => {
                // 观察者
                // console.log(entries)
                entries.forEach((item: any) => {
                    // entries 是被监听的dom集合，是一个数组
                    // console.log(item);
                    if (item.intersectionRatio <= 0) return; // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
                    const { target } = item;
                    let img = target.querySelector('img');
                    img.src = target.dataset.src; // 将 h5 自定义属性赋值给 src (进入可见区则加载图片)
                });
            },
            {
                threshold: threshold, // 用来指定交叉比例，决定什么时候触发回调函数，是一个数组，默认是[0]。
            }
        );
        console.log(domList);
        domList &&
            Array.from(domList).forEach(item => ioRef.current.observe(item)); // observe 开始观察，接受一个DOM节点对象
        return () => {
            ioRef.current.disconnect(); // 关闭观察器
        };
    });
};

export default useImageLazy;
