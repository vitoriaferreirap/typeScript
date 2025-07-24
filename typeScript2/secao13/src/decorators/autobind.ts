namespace App{
    
//autobind decorator
/**
 * Decorator criado para vincular o contexto de 'this' ao método,
 * garantindo que o método seja chamado com o contexto correto.
 * Isso é útil quando o método é passado como callback,
 * como no caso do evento de submit do formulário.
 */
export function autobind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
}
}