import React, { useState } from 'react'
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ImagePlaceHolder from './ImagePlaceHolder';

export default function Cards(props) {

    //handle broken images
    const [isBroken, setIsBroken] = useState(false)

    // Handle broken images
    function setImage(e) {
        setIsBroken(true)
    }

    // I wasn't sure what the other data in the object is used for, 
    // so I only chose to display the obvious ones.

    return (

        <Card style={{ width: '18rem' }}>
            {/* Conditionally render the image */}
           {isBroken ?
           <ImagePlaceHolder />
           :<Card.Img 
            variant="top" 
            src={`https://arthurfrost.qflo.co.za/${props.image}`} 
            onError={(e)=> setImage(e)}
            />}
            <Card.Body>
            <Image src={`https://arthurfrost.qflo.co.za/${props.icon}`} roundedCircle  />
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.decs}
                </Card.Text>
                <Card.Text>
                    {props.category}
                </Card.Text>
                <Card.Text>
                    Released: {props.releaseDate}
                </Card.Text>
           
                <audio 
                controls
                onPlay={(e) => e.target.style.boxShadow = 'rgb(32 158 223 / 47%) 0px 3px 8px'}
                onPause={(e) => e.target.style.boxShadow = 'none'} 
                >
                    <source src={`https://arthurfrost.qflo.co.za/${props.audio}`} type="audio/mpeg" />
                </audio>
            </Card.Body>
        </Card>

    )
}
