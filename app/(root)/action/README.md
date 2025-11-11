# Unified API Response System

このプロジェクトでは、Supabase、Prisma、fetchの全てのAPI操作に対して統一されたレスポンス型を使用しています。

## 基本概念

### ApiResponse型

全てのAPI操作は`ApiResponse<T>`型を返します：

```typescript
type ApiResponse<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: ApiError };
```

この型により：
- 成功時と失敗時が明確に区別される
- TypeScriptの型推論が機能する
- 一貫したエラーハンドリングが可能

### ApiError型

エラー情報は標準化されています：

```typescript
interface ApiError {
  code: string;          // エラーコード（ErrorCode enumから）
  message: string;       // ユーザー向けメッセージ
  details?: unknown;     // 詳細情報（開発用）
  statusCode?: number;   // HTTPステータスコード
}
```

## 使用方法

### 1. Server Actionsでの使用

#### Prisma操作

```typescript
"use server";

import { withPrisma } from "@/app/application/utils";
import type { ApiResponse } from "@/app/application/type";
import { prisma } from "@/libs/prisma";

export async function getUser(id: string): Promise<ApiResponse<User>> {
  return withPrisma(async () => {
    return await prisma.user.findUniqueOrThrow({
      where: { id },
    });
  });
}

export async function createUser(data: UserInput): Promise<ApiResponse<User>> {
  return withPrisma(async () => {
    return await prisma.user.create({
      data,
    });
  });
}
```

#### Supabase操作

```typescript
"use server";

import { withSupabase } from "@/app/application/utils";
import type { ApiResponse } from "@/app/application/type";
import { createServerClient } from "@/libs/supabase/server";

export async function getProfile(): Promise<ApiResponse<Profile>> {
  return withSupabase(async () => {
    const supabase = await createServerClient();
    return await supabase
      .from("profiles")
      .select("*")
      .single();
  });
}
```

#### 手動でのエラーハンドリング

```typescript
"use server";

import { success, error } from "@/app/application/utils";
import { ErrorCode } from "@/app/application/type";
import type { ApiResponse } from "@/app/application/type";

export async function complexOperation(): Promise<ApiResponse<Result>> {
  try {
    // ビジネスロジック
    const result = await someOperation();
    
    if (!result) {
      return error(
        ErrorCode.NOT_FOUND,
        "Resource not found",
        undefined,
        404
      );
    }
    
    return success(result);
  } catch (err) {
    return error(
      ErrorCode.INTERNAL_ERROR,
      "Operation failed",
      err instanceof Error ? err.message : err,
      500
    );
  }
}
```

### 2. Fetch操作

```typescript
import { withFetch } from "@/app/application/utils";
import type { ApiResponse } from "@/app/application/type";

async function fetchExternalData(): Promise<ApiResponse<ExternalData>> {
  return withFetch(async () => {
    return await fetch("https://api.example.com/data", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
}
```

### 3. Client Componentでの使用

```typescript
"use client";

import { useState } from "react";
import { getApplications } from "@/app/application/apply";
import { isSuccess, isError } from "@/app/application/utils";
import type { Application } from "@/libs/generated/prisma";

export function ApplicationList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadApplications() {
    setLoading(true);
    setError(null);
    
    const response = await getApplications();
    
    if (isSuccess(response)) {
      setApplications(response.data);
    } else {
      setError(response.error.message);
      console.error("Error details:", response.error);
    }
    
    setLoading(false);
  }

  // Alternative: using success property
  async function loadApplicationsAlt() {
    const response = await getApplications();
    
    if (response.success) {
      // TypeScript knows response.data is Application[]
      setApplications(response.data);
    } else {
      // TypeScript knows response.error is ApiError
      setError(response.error.message);
    }
  }

  // ...rest of component
}
```

### 4. Server Componentでの使用

```typescript
import { getDashboardStats } from "@/app/(root)/action/get-dashboard-stats";
import { isSuccess } from "@/app/application/utils";

export default async function Dashboard() {
  const response = await getDashboardStats();

  if (!response.success) {
    return (
      <div className="error">
        <h2>Error: {response.error.code}</h2>
        <p>{response.error.message}</p>
      </div>
    );
  }

  const stats = response.data;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Applications: {stats.totalApplications}</p>
      <p>Success Rate: {stats.successRate}%</p>
      {/* ...rest of component */}
    </div>
  );
}
```

## エラーコード

`ErrorCode` enumで定義されている標準エラーコード：

### 認証エラー
- `UNAUTHORIZED` - 認証が必要
- `FORBIDDEN` - アクセス権限なし
- `AUTH_FAILED` - 認証失敗

### データベースエラー
- `NOT_FOUND` - リソースが見つからない
- `ALREADY_EXISTS` - 既に存在する
- `DATABASE_ERROR` - データベースエラー

### バリデーションエラー
- `VALIDATION_ERROR` - バリデーション失敗
- `INVALID_INPUT` - 不正な入力

### ネットワークエラー
- `NETWORK_ERROR` - ネットワークエラー
- `FETCH_ERROR` - Fetchエラー

### サーバーエラー
- `INTERNAL_ERROR` - 内部エラー
- `UNKNOWN_ERROR` - 不明なエラー

## ベストプラクティス

### 1. 常にApiResponseを返す

```typescript
// ✅ Good
export async function getUser(): Promise<ApiResponse<User>> {
  return withPrisma(async () => prisma.user.findFirst());
}

// ❌ Bad
export async function getUser(): Promise<User | null> {
  return await prisma.user.findFirst();
}
```

### 2. エラーメッセージはユーザーフレンドリーに

```typescript
// ✅ Good
return error(
  ErrorCode.NOT_FOUND,
  "Application not found. It may have been deleted.",
  { id },
  404
);

// ❌ Bad
return error(
  ErrorCode.NOT_FOUND,
  "P2025: Record to update not found.",
  undefined,
  404
);
```

### 3. 詳細情報はdetailsフィールドに

```typescript
// ✅ Good - 開発時に役立つ詳細情報
return error(
  ErrorCode.VALIDATION_ERROR,
  "Invalid input data",
  { 
    fields: ["email", "password"],
    received: formData 
  },
  400
);
```

### 4. Type Guardsを使用

```typescript
// ✅ Good - Type-safe
if (isSuccess(response)) {
  // response.data is automatically typed
  console.log(response.data);
} else {
  // response.error is automatically typed
  console.error(response.error.message);
}

// Also good - using .success property
if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error.message);
}
```

### 5. Zod Validationとの統合

```typescript
import { z } from "zod";
import { fromZodError, withPrisma } from "@/app/application/utils";
import type { ApiResponse } from "@/app/application/type";

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function createUser(
  input: unknown
): Promise<ApiResponse<User>> {
  // Validate input
  const parsed = UserSchema.safeParse(input);
  if (!parsed.success) {
    const apiError = fromZodError(parsed.error);
    return {
      success: false,
      data: null,
      error: apiError,
    };
  }

  // Create user
  return withPrisma(async () => {
    return await prisma.user.create({
      data: parsed.data,
    });
  });
}
```

## マイグレーションガイド

既存のコードを新しいシステムに移行する手順：

### Before
```typescript
export async function getApplications() {
  const applications = await prisma.application.findMany();
  return applications;
}
```

### After
```typescript
import { withPrisma } from "@/app/application/utils";
import type { ApiResponse } from "@/app/application/type";

export async function getApplications(): Promise<ApiResponse<Application[]>> {
  return withPrisma(async () => {
    return await prisma.application.findMany();
  });
}
```

### クライアントコードの更新

Before:
```typescript
const applications = await getApplications();
```

After:
```typescript
const response = await getApplications();
if (response.success) {
  const applications = response.data;
}
```

## ヘルパー関数リファレンス

### `success<T>(data: T): ApiResponse<T>`
成功レスポンスを作成

### `error(code, message, details?, statusCode?): ApiResponse<T>`
エラーレスポンスを作成

### `withPrisma<T>(operation): Promise<ApiResponse<T>>`
Prisma操作をラップしてエラーハンドリング

### `withSupabase<T>(operation): Promise<ApiResponse<T>>`
Supabase操作をラップしてエラーハンドリング

### `withFetch<T>(operation): Promise<ApiResponse<T>>`
Fetch操作をラップしてエラーハンドリング

### `isSuccess<T>(response): boolean`
成功レスポンスかチェック（Type Guard）

### `isError<T>(response): boolean`
エラーレスポンスかチェック（Type Guard）

### `fromPrismaError(err): ApiError`
PrismaエラーをApiErrorに変換

### `fromSupabaseError(err): ApiError`
SupabaseエラーをApiErrorに変換

### `fromZodError(err): ApiError`
ZodエラーをApiErrorに変換

### `fromFetchError(err): ApiError`
FetchエラーをApiErrorに変換

