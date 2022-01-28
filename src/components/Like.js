import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Image} from "react-bootstrap";
import likePic from "../assets/like.png";
import {delLike, getLikes, like} from "../http/likeAPI";
import redLikePic from "../assets/redLike.png";
import {Context} from "../index";

const Like = ({collection}) => {
    const {user} = useContext(Context)
    const [likes, setLikes] = useState([]);

    const getLike = async()=>{
        setLikes(await getLikes(collection.id));
    }
    useMemo(getLike, [collection]);
    const likedBool = Boolean(likes.find(x => x.userId === user.user.id));


    const [liked, setLiked] = useState(likedBool);
    useEffect(() => { setLiked(likedBool)}, [likedBool] )



    const [pic, setPic] = useState(liked?redLikePic:likePic);

    useEffect(() => { setPic(liked?redLikePic:likePic)}, [liked] )

    const setLikedAll = async () => {
        if(!liked){
            await like(collection.id, user.user.id);
            setPic(redLikePic);
        }else {
            console.log(collection.id + " " + user.user.id)
            await delLike(collection.id, user.user.id);
            setPic(likePic);
            console.log("deleted")
        }
        setLiked(!liked);

        await getLike();
    }
    return (
        <div className="d-flex align-content-between">
            <p>{likes.length}</p>
            {user.isAuth?
                <Image className="m-1" src={pic} width={15} height={15} onClick={() => setLikedAll(!liked)}/>:
                <Image className="m-1" src={likePic} width={15} height={15} onClick={() => alert("Log in to like!")}/>
            }
        </div>
    );
};

export default Like;