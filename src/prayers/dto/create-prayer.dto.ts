export class CreatePrayerDto {
  email: string;
  message: string;
  status: 'pending' | 'prayed' | 'rejected';
}
