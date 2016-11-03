import { reducerCall } from './index';

export default function docs(state = {}, action) {
    return reducerCall(state, action, reducerClass);
}

class reducerClass {
    static fetchListSuccess(new_state, action) {
        console.log("fetch list success", action.docs.results);
        new_state.documents = action.docs.results;
        new_state.count = action.docs.count;
        new_state.loading = false;
        console.dir(new_state);
        return new_state;
    }

    static fetchImgSuccess(new_state, action) {
        console.log("fetch images success", action.img);
        new_state.images = action.img.results;
        console.dir(new_state);
        return new_state;
    }

    static onLoad(new_state, action) {
        console.log("onload");
        new_state.loading = true;
        return new_state;
    }
}

