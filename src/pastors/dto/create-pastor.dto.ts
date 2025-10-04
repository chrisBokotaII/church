import { Sermon } from 'src/sermons/entities/sermon.entity';

export class CreatePastorDto {
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
}

export class PastorResponseDto {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  sermons: Sermon[];
}
