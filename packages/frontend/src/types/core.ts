interface CoreRes {
  ok: boolean;
  error?: any;
}

interface CoreDataDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type { CoreDataDto, CoreRes };
