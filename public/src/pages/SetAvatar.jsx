import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Buffer } from 'buffer/';


function SetAvatar() {
  const api = 'https://api.multiavatar.com/';
  const apiKey = 'YOUR_API_KEY';
  const avatarSize = 128;
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const getAvatars = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const imageUrl = `${api}/${Math.round(Math.random()*1000)}`;
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(imageResponse.data, 'binary');
      data.push(buffer.toString('base64'));
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAvatars();
  }, []);

  const selectAvatar = (index) => {
    setSelectedAvatar(index);
  };

  const setProfilePicture = async () => {
    // implementation for setting profile picture
  };

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an Avatar</h1>
        </div>
        <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
              >
                <img
                  src={`data:image/png;base64;charset=utf-8,${avatar}`}
                  alt="avatar"
                  onClick={() => selectAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button className='submit-btn' onClick={setProfilePicture}>Set as profile picture</button>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
      }
    }
    .selected{
        border:0.4rem solid #4e0eff;
    }
}
`;

export default SetAvatar