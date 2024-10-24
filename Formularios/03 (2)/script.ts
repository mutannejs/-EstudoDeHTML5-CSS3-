const form = document.querySelector<HTMLFormElement>('#payment-form');

interface IPayment {
    cardnumber: number;
    expiration: Date;
    password: string;
    title: 'A' | 'K' | 'Q';
    usercard: 'visa' | 'mc' | 'amex';
    usermail: string;
    username: string;
}

function tratar(data: any): IPayment {
    return {
        ...data,
        cardnumber: Number(data.cardnumber),
        expiration: new Date(data.expiration)
    };
}

function validar(data: IPayment) {
    if (!/murillo/.test(data.username)) throw 'name';
}

function submit(event: SubmitEvent) {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
        const formData = new FormData(event.target);
        const data = tratar(Object.fromEntries(formData.entries()));
        try {
            validar(data);
            // submit
        } catch (error) {
            if (typeof error === 'string') {
                document.querySelector(`#${error}`)?.classList.add('error');
            }
        }
    }
}

function clearError(e: KeyboardEvent) {
    const target = e.currentTarget;
    if (target instanceof HTMLInputElement)
        target.classList.remove('error');
}

form?.addEventListener('submit', submit);

document.querySelectorAll('input').forEach(e => {
    e.addEventListener('keyup', clearError)
});