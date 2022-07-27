import {Component, useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';



const Slider = (props) => {
    const [slide, setSlide] = useState(0)
    const [autoplay, setAutoplay] = useState(false)

    function logging() {
        console.log('log!')
    }

    const countTotal = (num) => {
        console.log('counting')
        return num + 10
    }

    useEffect(() => {
        console.log('effect update')
        document.title = `Slide: ${slide}`

        window.addEventListener('click', logging)

        return () => {
            window.removeEventListener('click', logging)
        }
    }, [slide]) 

    const getSomeImages = useCallback(() => {
        console.log('fetching')
        return ['https://www.imgonline.com.ua/examples/bee-on-daisy.jpg',
                'https://www.imgonline.com.ua/examples/orange-flowers.jpg']
    }, [])

    function changeSlide(i = 1) {
        setSlide(slide => slide + i)
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay)
    }

    const total = useMemo(() => {
        return countTotal(slide)
    }, [slide])

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide])

    useEffect(() => {
        console.log('style')
    }, [style]) 

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <Slide getSomeImages={getSomeImages}/> 

                <div className="text-center mt-5">Active slide {slide} <br/> 
                {autoplay ? 'auto' : null}
                </div>
                <div style={style} className='text-center mt-5'>Total slides: {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                     <button 
                        className="btn btn-primary me-2"
                        onClick={() => toggleAutoplay()}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([])

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (<>
        {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
    </>)
}

function App() {
    return (<>
        <Slider/>
        </>);
}

export default App;
