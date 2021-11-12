import React from 'react'
import NavVideo from '../components/NavVideo'
import VideoForm from '../components/VideoForm'
import { ContextCallProvider } from '../ContextCall'

const VideoCall = () => {
    return (
        <>
        <ContextCallProvider>
            <NavVideo/>
            <VideoForm/>
        </ContextCallProvider>

        </>
    )
}

export default VideoCall
