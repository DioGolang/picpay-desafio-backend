export class TransferCompletedEvent {
  constructor(
    public readonly transferId: string,
    public readonly amount: number,
    public readonly payerId: string,
    public readonly payeeId: string,
  ) {}
}

export class TransferFailedEvent {
  constructor(
    public readonly transferId: string,
    public readonly amount: number,
    public readonly payerId: string,
    public readonly payeeId: string,
  ) {}
}

export class TransferPendingEvent {
  constructor(
    public readonly transferId: string,
    public readonly amount: number,
    public readonly payerId: string,
    public readonly payeeId: string,
  ) {}
}