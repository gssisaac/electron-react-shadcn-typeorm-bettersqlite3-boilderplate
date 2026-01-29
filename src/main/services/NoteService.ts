import { getDataSource } from '../database';
import { Note } from '../entities/Note';
import { Repository } from 'typeorm';

export class NoteService {
  private getRepository(): Repository<Note> {
    return getDataSource().getRepository(Note);
  }

  async getAll(): Promise<Note[]> {
    return await this.getRepository().find({
      order: { updatedAt: 'DESC' },
    });
  }

  async getById(id: number): Promise<Note | null> {
    return await this.getRepository().findOne({ where: { id } });
  }

  async create(data: { title: string; content?: string }): Promise<Note> {
    const note = this.getRepository().create({
      title: data.title,
      content: data.content || '',
    });
    return await this.getRepository().save(note);
  }

  async update(id: number, data: { title?: string; content?: string }): Promise<Note | null> {
    const note = await this.getById(id);
    if (!note) {
      return null;
    }

    if (data.title !== undefined) {
      note.title = data.title;
    }
    if (data.content !== undefined) {
      note.content = data.content;
    }

    return await this.getRepository().save(note);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.getRepository().delete(id);
    return (result.affected ?? 0) > 0;
  }
}
