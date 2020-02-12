import React, {Component} from 'react';

const PeopleContext = React.createContext({
    people:'people',
    latitude: '',
    longitude: '',
    blueClick: () => {},
    greyClick: () => {},
    blackClick: () => {},
    onRefresh: () => {},
    fetchRemote: () => {},
});

export default PeopleContext;