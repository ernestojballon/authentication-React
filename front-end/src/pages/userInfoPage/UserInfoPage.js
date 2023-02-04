import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '../../auth/useToken';
import { useUser } from '../../auth/useUser';
import { updateUserById, getUserById } from '../../services/user.service';
import Navbar from '../../components/navbar/navbar';
import { styles } from './styles';

export function UserInfoPage() {
    const [favoriteFood, setFavoriteFood] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [bio, setBio] = useState('');
    const { deleteToken } = useToken();
    const [user, setUser] = useUser();

    useEffect(() => {
        if (user?.info) {
            setFavoriteFood(user.info.favoriteFood);
            setHairColor(user.info.hairColor);
            setBio(user.info.bio);
        }
    }, [user]);
    // We'll use the history to navigate the user
    // programmatically later on (we're not using it yet)
    const history = useHistory();

    // These state variables control whether or not we show
    // the success and error message sections after making
    // a network request (see JSX below).
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // This useEffect hook automatically hides the
    // success and error messages after 3 seconds when they're shown.
    // Just a little user interface improvement.
    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        await updateUserById({
            id: user.id,
            userInfo: {
                favoriteFood,
                hairColor,
                bio,
            },
        });
    };

    const logOut = () => {
        deleteToken();
        history.push('/login');
    };

    const resetValues = () =>
        getUserById(user.id).then((userInfo) => {
            setUser(userInfo);
        });

    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <>
            <Navbar />
            <div css={styles.container}>
                <div className="content-container">
                    <h1>Info for {user.email}</h1>
                    {showSuccessMessage && (
                        <div className="success">
                            Successfully saved user data!
                        </div>
                    )}
                    {showErrorMessage && (
                        <div className="fail">
                            Uh oh... something went wrong and we couldn&apos;t
                            save changes
                        </div>
                    )}
                    <label htmlFor="favoriteFood">
                        Favorite Food:
                        <input
                            onChange={(e) => setFavoriteFood(e.target.value)}
                            value={favoriteFood}
                        />
                    </label>
                    <label htmlFor="hairColor">
                        Hair Color:
                        <input
                            onChange={(e) => setHairColor(e.target.value)}
                            value={hairColor}
                        />
                    </label>
                    <label htmlFor="bio">
                        Bio:
                        <input
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                        />
                    </label>
                    <hr />
                    <button type="button" onClick={saveChanges}>
                        Save Changes
                    </button>
                    <button type="button" onClick={resetValues}>
                        Reset Values
                    </button>
                    <button type="button" onClick={logOut}>
                        Log Out
                    </button>
                </div>
            </div>
        </>
    );
}
