import ObserverInterface from "./0bserverInterface";

interface NotifierInterface {
    notify(): void
    addEventListener(observer: ObserverInterface): void
    removeObserver(observerId: string): void
}

export default NotifierInterface