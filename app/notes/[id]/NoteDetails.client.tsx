'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
// Використовуємо чистий абсолютний шлях через аліас @
import { fetchNoteById } from '@/lib/api';
// Імпортуємо стилі, які лежать ПОРУЧ із цим компонентом за вимогами ТЗ
import css from './NoteDetails.client.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  // Опрацювання стану isLoading за технічним завданням
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  // Опрацювання помилки за технічним завданням
  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  // Успішна розмітка картки детального перегляду за технічним завданням
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          {/* Використовуємо реальний заголовок нотатки */}
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
