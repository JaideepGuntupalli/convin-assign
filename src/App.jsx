import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers, fetchUserDetails } from "./app/actions";
import { PulseLoader } from "react-spinners";
import Author from "./components/Author";

function App(props) {
    useEffect(() => {
        props.fetchUsers();
    }, []);

    const handleButtonClick = (id) => {
        props.fetchUserDetails(id);
    };

    return (
        <div className="App">
            <section className="flex flex-col gap-8 items-center justify-center">
                {props.loading ? (
                    <PulseLoader color="#fff" />
                ) : (
                    <section>
                        {Object.keys(props.user).length !== 0 ? (
                            <section className="flex items-center gap-4">
                                <img
                                    src={props.user.avatar}
                                    alt={
                                        props.user.first_name +
                                        " " +
                                        props.user.last_name
                                    }
                                    className="border-2 rounded-full h-20 w-20"
                                />
                                <div className="text-left">
                                    <p>
                                        {props.user.first_name}{" "}
                                        {props.user.last_name}
                                    </p>
                                    <p>{props.user.email}</p>
                                </div>
                            </section>
                        ) : (
                            <p>Click any of the below button</p>
                        )}
                        {props.error && (
                            <p className="bg-red-200 text-red-600 border-2 border-red-500 rounded-md p-2">
                                {props.error}
                            </p>
                        )}
                    </section>
                )}
                <section className="flex gap-4">
                    {props.users.map((user) => (
                        <button
                            key={user.id}
                            onClick={() => handleButtonClick(user.id)}
                        >
                            {user.id}
                        </button>
                    ))}
                </section>
            </section>
            <Author />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        user: state.user,
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchUserDetails: (id) => dispatch(fetchUserDetails(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
