export interface INotification{
  notify(email: string, message: string): Promise<void>
}