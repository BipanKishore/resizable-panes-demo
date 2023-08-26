class Subscription {

    subscriptionList = {
    }

    subscribe (id, event) {
        this.subscriptionList[id] = event
    }

    publish (id, value) {
        this.subscriptionList[id](value)
    }

    unSubscribe (id) {
        delete this.subscriptionList[id]
    }
}

export const subscription = new Subscription