export default class Visualization {
    constructor() {
    }
    getRootElement() {
        throw new Error('getRootElement needs to be defined');
    }
    tick() {
        throw new Error('tick must be implemented');
    }
}