"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { TodoEvent } from "@/components/todos";

export function useTodos(initial: TodoEvent[]) {
  const [todos, setTodos] = useState<TodoEvent[]>(initial);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const connectRef = useRef<(() => void) | null>(null);

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource("/api/sse");
    eventSourceRef.current = es;

    es.addEventListener("todos", (event) => {
      try {
        const payload = JSON.parse(event.data) as { type: string; data: TodoEvent[]; timestamp: number };
        if (Array.isArray(payload.data)) {
          setTodos(payload.data);
        }
      } catch {
        // malformed event, ignore
      }
    });

    es.onerror = () => {
      es.close();
      clearTimeout(reconnectTimeoutRef.current ?? undefined);
      reconnectTimeoutRef.current = setTimeout(() => {
        connectRef.current?.();
      }, 5000);
    };
  }, []);

  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimeoutRef.current ?? undefined);
      eventSourceRef.current?.close();
    };
  }, [connect]);

  return todos;
}
