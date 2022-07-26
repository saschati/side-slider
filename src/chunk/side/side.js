export default class Side {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.reverse = false;
    }
    /**
     * Set direction to hide or show.
     */
    setReverse(reverse) {
        this.reverse = reverse;
    }
    /**
     * Returns the DOM Element of the slider object.
     */
    getWrapper() {
        return this.wrapper;
    }
}
