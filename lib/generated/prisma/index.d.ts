
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Mindmap
 * 
 */
export type Mindmap = $Result.DefaultSelection<Prisma.$MindmapPayload>
/**
 * Model MindmapNode
 * 
 */
export type MindmapNode = $Result.DefaultSelection<Prisma.$MindmapNodePayload>
/**
 * Model Request
 * 
 */
export type Request = $Result.DefaultSelection<Prisma.$RequestPayload>
/**
 * Model Flashcard
 * 
 */
export type Flashcard = $Result.DefaultSelection<Prisma.$FlashcardPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RequestType: {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE'
};

export type RequestType = (typeof RequestType)[keyof typeof RequestType]


export const RequestStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]

}

export type RequestType = $Enums.RequestType

export const RequestType: typeof $Enums.RequestType

export type RequestStatus = $Enums.RequestStatus

export const RequestStatus: typeof $Enums.RequestStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Mindmaps
 * const mindmaps = await prisma.mindmap.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Mindmaps
   * const mindmaps = await prisma.mindmap.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.mindmap`: Exposes CRUD operations for the **Mindmap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mindmaps
    * const mindmaps = await prisma.mindmap.findMany()
    * ```
    */
  get mindmap(): Prisma.MindmapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mindmapNode`: Exposes CRUD operations for the **MindmapNode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MindmapNodes
    * const mindmapNodes = await prisma.mindmapNode.findMany()
    * ```
    */
  get mindmapNode(): Prisma.MindmapNodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.request`: Exposes CRUD operations for the **Request** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Requests
    * const requests = await prisma.request.findMany()
    * ```
    */
  get request(): Prisma.RequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.flashcard`: Exposes CRUD operations for the **Flashcard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Flashcards
    * const flashcards = await prisma.flashcard.findMany()
    * ```
    */
  get flashcard(): Prisma.FlashcardDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Mindmap: 'Mindmap',
    MindmapNode: 'MindmapNode',
    Request: 'Request',
    Flashcard: 'Flashcard'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "mindmap" | "mindmapNode" | "request" | "flashcard"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Mindmap: {
        payload: Prisma.$MindmapPayload<ExtArgs>
        fields: Prisma.MindmapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MindmapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MindmapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload>
          }
          findFirst: {
            args: Prisma.MindmapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MindmapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload>
          }
          findMany: {
            args: Prisma.MindmapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload>[]
          }
          create: {
            args: Prisma.MindmapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload>
          }
          createMany: {
            args: Prisma.MindmapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MindmapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload>[]
          }
          delete: {
            args: Prisma.MindmapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload>
          }
          update: {
            args: Prisma.MindmapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload>
          }
          deleteMany: {
            args: Prisma.MindmapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MindmapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MindmapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload>[]
          }
          upsert: {
            args: Prisma.MindmapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapPayload>
          }
          aggregate: {
            args: Prisma.MindmapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMindmap>
          }
          groupBy: {
            args: Prisma.MindmapGroupByArgs<ExtArgs>
            result: $Utils.Optional<MindmapGroupByOutputType>[]
          }
          count: {
            args: Prisma.MindmapCountArgs<ExtArgs>
            result: $Utils.Optional<MindmapCountAggregateOutputType> | number
          }
        }
      }
      MindmapNode: {
        payload: Prisma.$MindmapNodePayload<ExtArgs>
        fields: Prisma.MindmapNodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MindmapNodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MindmapNodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload>
          }
          findFirst: {
            args: Prisma.MindmapNodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MindmapNodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload>
          }
          findMany: {
            args: Prisma.MindmapNodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload>[]
          }
          create: {
            args: Prisma.MindmapNodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload>
          }
          createMany: {
            args: Prisma.MindmapNodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MindmapNodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload>[]
          }
          delete: {
            args: Prisma.MindmapNodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload>
          }
          update: {
            args: Prisma.MindmapNodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload>
          }
          deleteMany: {
            args: Prisma.MindmapNodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MindmapNodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MindmapNodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload>[]
          }
          upsert: {
            args: Prisma.MindmapNodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MindmapNodePayload>
          }
          aggregate: {
            args: Prisma.MindmapNodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMindmapNode>
          }
          groupBy: {
            args: Prisma.MindmapNodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MindmapNodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MindmapNodeCountArgs<ExtArgs>
            result: $Utils.Optional<MindmapNodeCountAggregateOutputType> | number
          }
        }
      }
      Request: {
        payload: Prisma.$RequestPayload<ExtArgs>
        fields: Prisma.RequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          findFirst: {
            args: Prisma.RequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          findMany: {
            args: Prisma.RequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>[]
          }
          create: {
            args: Prisma.RequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          createMany: {
            args: Prisma.RequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>[]
          }
          delete: {
            args: Prisma.RequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          update: {
            args: Prisma.RequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          deleteMany: {
            args: Prisma.RequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>[]
          }
          upsert: {
            args: Prisma.RequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestPayload>
          }
          aggregate: {
            args: Prisma.RequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequest>
          }
          groupBy: {
            args: Prisma.RequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestCountArgs<ExtArgs>
            result: $Utils.Optional<RequestCountAggregateOutputType> | number
          }
        }
      }
      Flashcard: {
        payload: Prisma.$FlashcardPayload<ExtArgs>
        fields: Prisma.FlashcardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FlashcardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FlashcardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload>
          }
          findFirst: {
            args: Prisma.FlashcardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FlashcardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload>
          }
          findMany: {
            args: Prisma.FlashcardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload>[]
          }
          create: {
            args: Prisma.FlashcardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload>
          }
          createMany: {
            args: Prisma.FlashcardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FlashcardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload>[]
          }
          delete: {
            args: Prisma.FlashcardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload>
          }
          update: {
            args: Prisma.FlashcardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload>
          }
          deleteMany: {
            args: Prisma.FlashcardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FlashcardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FlashcardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload>[]
          }
          upsert: {
            args: Prisma.FlashcardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlashcardPayload>
          }
          aggregate: {
            args: Prisma.FlashcardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFlashcard>
          }
          groupBy: {
            args: Prisma.FlashcardGroupByArgs<ExtArgs>
            result: $Utils.Optional<FlashcardGroupByOutputType>[]
          }
          count: {
            args: Prisma.FlashcardCountArgs<ExtArgs>
            result: $Utils.Optional<FlashcardCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    mindmap?: MindmapOmit
    mindmapNode?: MindmapNodeOmit
    request?: RequestOmit
    flashcard?: FlashcardOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MindmapCountOutputType
   */

  export type MindmapCountOutputType = {
    nodes: number
  }

  export type MindmapCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nodes?: boolean | MindmapCountOutputTypeCountNodesArgs
  }

  // Custom InputTypes
  /**
   * MindmapCountOutputType without action
   */
  export type MindmapCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapCountOutputType
     */
    select?: MindmapCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MindmapCountOutputType without action
   */
  export type MindmapCountOutputTypeCountNodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MindmapNodeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Mindmap
   */

  export type AggregateMindmap = {
    _count: MindmapCountAggregateOutputType | null
    _min: MindmapMinAggregateOutputType | null
    _max: MindmapMaxAggregateOutputType | null
  }

  export type MindmapMinAggregateOutputType = {
    id: string | null
    title: string | null
    topic: string | null
    difficulty: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MindmapMaxAggregateOutputType = {
    id: string | null
    title: string | null
    topic: string | null
    difficulty: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MindmapCountAggregateOutputType = {
    id: number
    title: number
    topic: number
    difficulty: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MindmapMinAggregateInputType = {
    id?: true
    title?: true
    topic?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MindmapMaxAggregateInputType = {
    id?: true
    title?: true
    topic?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MindmapCountAggregateInputType = {
    id?: true
    title?: true
    topic?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MindmapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mindmap to aggregate.
     */
    where?: MindmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mindmaps to fetch.
     */
    orderBy?: MindmapOrderByWithRelationInput | MindmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MindmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mindmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mindmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mindmaps
    **/
    _count?: true | MindmapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MindmapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MindmapMaxAggregateInputType
  }

  export type GetMindmapAggregateType<T extends MindmapAggregateArgs> = {
        [P in keyof T & keyof AggregateMindmap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMindmap[P]>
      : GetScalarType<T[P], AggregateMindmap[P]>
  }




  export type MindmapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MindmapWhereInput
    orderBy?: MindmapOrderByWithAggregationInput | MindmapOrderByWithAggregationInput[]
    by: MindmapScalarFieldEnum[] | MindmapScalarFieldEnum
    having?: MindmapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MindmapCountAggregateInputType | true
    _min?: MindmapMinAggregateInputType
    _max?: MindmapMaxAggregateInputType
  }

  export type MindmapGroupByOutputType = {
    id: string
    title: string
    topic: string
    difficulty: string
    createdAt: Date
    updatedAt: Date
    _count: MindmapCountAggregateOutputType | null
    _min: MindmapMinAggregateOutputType | null
    _max: MindmapMaxAggregateOutputType | null
  }

  type GetMindmapGroupByPayload<T extends MindmapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MindmapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MindmapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MindmapGroupByOutputType[P]>
            : GetScalarType<T[P], MindmapGroupByOutputType[P]>
        }
      >
    >


  export type MindmapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    topic?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    nodes?: boolean | Mindmap$nodesArgs<ExtArgs>
    _count?: boolean | MindmapCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mindmap"]>

  export type MindmapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    topic?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mindmap"]>

  export type MindmapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    topic?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mindmap"]>

  export type MindmapSelectScalar = {
    id?: boolean
    title?: boolean
    topic?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MindmapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "topic" | "difficulty" | "createdAt" | "updatedAt", ExtArgs["result"]["mindmap"]>
  export type MindmapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nodes?: boolean | Mindmap$nodesArgs<ExtArgs>
    _count?: boolean | MindmapCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MindmapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MindmapIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MindmapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mindmap"
    objects: {
      nodes: Prisma.$MindmapNodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      topic: string
      difficulty: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mindmap"]>
    composites: {}
  }

  type MindmapGetPayload<S extends boolean | null | undefined | MindmapDefaultArgs> = $Result.GetResult<Prisma.$MindmapPayload, S>

  type MindmapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MindmapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MindmapCountAggregateInputType | true
    }

  export interface MindmapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mindmap'], meta: { name: 'Mindmap' } }
    /**
     * Find zero or one Mindmap that matches the filter.
     * @param {MindmapFindUniqueArgs} args - Arguments to find a Mindmap
     * @example
     * // Get one Mindmap
     * const mindmap = await prisma.mindmap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MindmapFindUniqueArgs>(args: SelectSubset<T, MindmapFindUniqueArgs<ExtArgs>>): Prisma__MindmapClient<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mindmap that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MindmapFindUniqueOrThrowArgs} args - Arguments to find a Mindmap
     * @example
     * // Get one Mindmap
     * const mindmap = await prisma.mindmap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MindmapFindUniqueOrThrowArgs>(args: SelectSubset<T, MindmapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MindmapClient<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mindmap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapFindFirstArgs} args - Arguments to find a Mindmap
     * @example
     * // Get one Mindmap
     * const mindmap = await prisma.mindmap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MindmapFindFirstArgs>(args?: SelectSubset<T, MindmapFindFirstArgs<ExtArgs>>): Prisma__MindmapClient<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mindmap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapFindFirstOrThrowArgs} args - Arguments to find a Mindmap
     * @example
     * // Get one Mindmap
     * const mindmap = await prisma.mindmap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MindmapFindFirstOrThrowArgs>(args?: SelectSubset<T, MindmapFindFirstOrThrowArgs<ExtArgs>>): Prisma__MindmapClient<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mindmaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mindmaps
     * const mindmaps = await prisma.mindmap.findMany()
     * 
     * // Get first 10 Mindmaps
     * const mindmaps = await prisma.mindmap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mindmapWithIdOnly = await prisma.mindmap.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MindmapFindManyArgs>(args?: SelectSubset<T, MindmapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mindmap.
     * @param {MindmapCreateArgs} args - Arguments to create a Mindmap.
     * @example
     * // Create one Mindmap
     * const Mindmap = await prisma.mindmap.create({
     *   data: {
     *     // ... data to create a Mindmap
     *   }
     * })
     * 
     */
    create<T extends MindmapCreateArgs>(args: SelectSubset<T, MindmapCreateArgs<ExtArgs>>): Prisma__MindmapClient<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mindmaps.
     * @param {MindmapCreateManyArgs} args - Arguments to create many Mindmaps.
     * @example
     * // Create many Mindmaps
     * const mindmap = await prisma.mindmap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MindmapCreateManyArgs>(args?: SelectSubset<T, MindmapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mindmaps and returns the data saved in the database.
     * @param {MindmapCreateManyAndReturnArgs} args - Arguments to create many Mindmaps.
     * @example
     * // Create many Mindmaps
     * const mindmap = await prisma.mindmap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mindmaps and only return the `id`
     * const mindmapWithIdOnly = await prisma.mindmap.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MindmapCreateManyAndReturnArgs>(args?: SelectSubset<T, MindmapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mindmap.
     * @param {MindmapDeleteArgs} args - Arguments to delete one Mindmap.
     * @example
     * // Delete one Mindmap
     * const Mindmap = await prisma.mindmap.delete({
     *   where: {
     *     // ... filter to delete one Mindmap
     *   }
     * })
     * 
     */
    delete<T extends MindmapDeleteArgs>(args: SelectSubset<T, MindmapDeleteArgs<ExtArgs>>): Prisma__MindmapClient<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mindmap.
     * @param {MindmapUpdateArgs} args - Arguments to update one Mindmap.
     * @example
     * // Update one Mindmap
     * const mindmap = await prisma.mindmap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MindmapUpdateArgs>(args: SelectSubset<T, MindmapUpdateArgs<ExtArgs>>): Prisma__MindmapClient<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mindmaps.
     * @param {MindmapDeleteManyArgs} args - Arguments to filter Mindmaps to delete.
     * @example
     * // Delete a few Mindmaps
     * const { count } = await prisma.mindmap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MindmapDeleteManyArgs>(args?: SelectSubset<T, MindmapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mindmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mindmaps
     * const mindmap = await prisma.mindmap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MindmapUpdateManyArgs>(args: SelectSubset<T, MindmapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mindmaps and returns the data updated in the database.
     * @param {MindmapUpdateManyAndReturnArgs} args - Arguments to update many Mindmaps.
     * @example
     * // Update many Mindmaps
     * const mindmap = await prisma.mindmap.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mindmaps and only return the `id`
     * const mindmapWithIdOnly = await prisma.mindmap.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MindmapUpdateManyAndReturnArgs>(args: SelectSubset<T, MindmapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mindmap.
     * @param {MindmapUpsertArgs} args - Arguments to update or create a Mindmap.
     * @example
     * // Update or create a Mindmap
     * const mindmap = await prisma.mindmap.upsert({
     *   create: {
     *     // ... data to create a Mindmap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mindmap we want to update
     *   }
     * })
     */
    upsert<T extends MindmapUpsertArgs>(args: SelectSubset<T, MindmapUpsertArgs<ExtArgs>>): Prisma__MindmapClient<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mindmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapCountArgs} args - Arguments to filter Mindmaps to count.
     * @example
     * // Count the number of Mindmaps
     * const count = await prisma.mindmap.count({
     *   where: {
     *     // ... the filter for the Mindmaps we want to count
     *   }
     * })
    **/
    count<T extends MindmapCountArgs>(
      args?: Subset<T, MindmapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MindmapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mindmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MindmapAggregateArgs>(args: Subset<T, MindmapAggregateArgs>): Prisma.PrismaPromise<GetMindmapAggregateType<T>>

    /**
     * Group by Mindmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MindmapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MindmapGroupByArgs['orderBy'] }
        : { orderBy?: MindmapGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MindmapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMindmapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mindmap model
   */
  readonly fields: MindmapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mindmap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MindmapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nodes<T extends Mindmap$nodesArgs<ExtArgs> = {}>(args?: Subset<T, Mindmap$nodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mindmap model
   */
  interface MindmapFieldRefs {
    readonly id: FieldRef<"Mindmap", 'String'>
    readonly title: FieldRef<"Mindmap", 'String'>
    readonly topic: FieldRef<"Mindmap", 'String'>
    readonly difficulty: FieldRef<"Mindmap", 'String'>
    readonly createdAt: FieldRef<"Mindmap", 'DateTime'>
    readonly updatedAt: FieldRef<"Mindmap", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mindmap findUnique
   */
  export type MindmapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
    /**
     * Filter, which Mindmap to fetch.
     */
    where: MindmapWhereUniqueInput
  }

  /**
   * Mindmap findUniqueOrThrow
   */
  export type MindmapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
    /**
     * Filter, which Mindmap to fetch.
     */
    where: MindmapWhereUniqueInput
  }

  /**
   * Mindmap findFirst
   */
  export type MindmapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
    /**
     * Filter, which Mindmap to fetch.
     */
    where?: MindmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mindmaps to fetch.
     */
    orderBy?: MindmapOrderByWithRelationInput | MindmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mindmaps.
     */
    cursor?: MindmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mindmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mindmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mindmaps.
     */
    distinct?: MindmapScalarFieldEnum | MindmapScalarFieldEnum[]
  }

  /**
   * Mindmap findFirstOrThrow
   */
  export type MindmapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
    /**
     * Filter, which Mindmap to fetch.
     */
    where?: MindmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mindmaps to fetch.
     */
    orderBy?: MindmapOrderByWithRelationInput | MindmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mindmaps.
     */
    cursor?: MindmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mindmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mindmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mindmaps.
     */
    distinct?: MindmapScalarFieldEnum | MindmapScalarFieldEnum[]
  }

  /**
   * Mindmap findMany
   */
  export type MindmapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
    /**
     * Filter, which Mindmaps to fetch.
     */
    where?: MindmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mindmaps to fetch.
     */
    orderBy?: MindmapOrderByWithRelationInput | MindmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mindmaps.
     */
    cursor?: MindmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mindmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mindmaps.
     */
    skip?: number
    distinct?: MindmapScalarFieldEnum | MindmapScalarFieldEnum[]
  }

  /**
   * Mindmap create
   */
  export type MindmapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
    /**
     * The data needed to create a Mindmap.
     */
    data: XOR<MindmapCreateInput, MindmapUncheckedCreateInput>
  }

  /**
   * Mindmap createMany
   */
  export type MindmapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mindmaps.
     */
    data: MindmapCreateManyInput | MindmapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mindmap createManyAndReturn
   */
  export type MindmapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * The data used to create many Mindmaps.
     */
    data: MindmapCreateManyInput | MindmapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mindmap update
   */
  export type MindmapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
    /**
     * The data needed to update a Mindmap.
     */
    data: XOR<MindmapUpdateInput, MindmapUncheckedUpdateInput>
    /**
     * Choose, which Mindmap to update.
     */
    where: MindmapWhereUniqueInput
  }

  /**
   * Mindmap updateMany
   */
  export type MindmapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mindmaps.
     */
    data: XOR<MindmapUpdateManyMutationInput, MindmapUncheckedUpdateManyInput>
    /**
     * Filter which Mindmaps to update
     */
    where?: MindmapWhereInput
    /**
     * Limit how many Mindmaps to update.
     */
    limit?: number
  }

  /**
   * Mindmap updateManyAndReturn
   */
  export type MindmapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * The data used to update Mindmaps.
     */
    data: XOR<MindmapUpdateManyMutationInput, MindmapUncheckedUpdateManyInput>
    /**
     * Filter which Mindmaps to update
     */
    where?: MindmapWhereInput
    /**
     * Limit how many Mindmaps to update.
     */
    limit?: number
  }

  /**
   * Mindmap upsert
   */
  export type MindmapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
    /**
     * The filter to search for the Mindmap to update in case it exists.
     */
    where: MindmapWhereUniqueInput
    /**
     * In case the Mindmap found by the `where` argument doesn't exist, create a new Mindmap with this data.
     */
    create: XOR<MindmapCreateInput, MindmapUncheckedCreateInput>
    /**
     * In case the Mindmap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MindmapUpdateInput, MindmapUncheckedUpdateInput>
  }

  /**
   * Mindmap delete
   */
  export type MindmapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
    /**
     * Filter which Mindmap to delete.
     */
    where: MindmapWhereUniqueInput
  }

  /**
   * Mindmap deleteMany
   */
  export type MindmapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mindmaps to delete
     */
    where?: MindmapWhereInput
    /**
     * Limit how many Mindmaps to delete.
     */
    limit?: number
  }

  /**
   * Mindmap.nodes
   */
  export type Mindmap$nodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    where?: MindmapNodeWhereInput
    orderBy?: MindmapNodeOrderByWithRelationInput | MindmapNodeOrderByWithRelationInput[]
    cursor?: MindmapNodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MindmapNodeScalarFieldEnum | MindmapNodeScalarFieldEnum[]
  }

  /**
   * Mindmap without action
   */
  export type MindmapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mindmap
     */
    select?: MindmapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mindmap
     */
    omit?: MindmapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapInclude<ExtArgs> | null
  }


  /**
   * Model MindmapNode
   */

  export type AggregateMindmapNode = {
    _count: MindmapNodeCountAggregateOutputType | null
    _avg: MindmapNodeAvgAggregateOutputType | null
    _sum: MindmapNodeSumAggregateOutputType | null
    _min: MindmapNodeMinAggregateOutputType | null
    _max: MindmapNodeMaxAggregateOutputType | null
  }

  export type MindmapNodeAvgAggregateOutputType = {
    positionX: number | null
    positionY: number | null
  }

  export type MindmapNodeSumAggregateOutputType = {
    positionX: number | null
    positionY: number | null
  }

  export type MindmapNodeMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    parentId: string | null
    positionX: number | null
    positionY: number | null
    mindmapId: string | null
  }

  export type MindmapNodeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    parentId: string | null
    positionX: number | null
    positionY: number | null
    mindmapId: string | null
  }

  export type MindmapNodeCountAggregateOutputType = {
    id: number
    title: number
    content: number
    parentId: number
    positionX: number
    positionY: number
    mindmapId: number
    _all: number
  }


  export type MindmapNodeAvgAggregateInputType = {
    positionX?: true
    positionY?: true
  }

  export type MindmapNodeSumAggregateInputType = {
    positionX?: true
    positionY?: true
  }

  export type MindmapNodeMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    parentId?: true
    positionX?: true
    positionY?: true
    mindmapId?: true
  }

  export type MindmapNodeMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    parentId?: true
    positionX?: true
    positionY?: true
    mindmapId?: true
  }

  export type MindmapNodeCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    parentId?: true
    positionX?: true
    positionY?: true
    mindmapId?: true
    _all?: true
  }

  export type MindmapNodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MindmapNode to aggregate.
     */
    where?: MindmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MindmapNodes to fetch.
     */
    orderBy?: MindmapNodeOrderByWithRelationInput | MindmapNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MindmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MindmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MindmapNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MindmapNodes
    **/
    _count?: true | MindmapNodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MindmapNodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MindmapNodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MindmapNodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MindmapNodeMaxAggregateInputType
  }

  export type GetMindmapNodeAggregateType<T extends MindmapNodeAggregateArgs> = {
        [P in keyof T & keyof AggregateMindmapNode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMindmapNode[P]>
      : GetScalarType<T[P], AggregateMindmapNode[P]>
  }




  export type MindmapNodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MindmapNodeWhereInput
    orderBy?: MindmapNodeOrderByWithAggregationInput | MindmapNodeOrderByWithAggregationInput[]
    by: MindmapNodeScalarFieldEnum[] | MindmapNodeScalarFieldEnum
    having?: MindmapNodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MindmapNodeCountAggregateInputType | true
    _avg?: MindmapNodeAvgAggregateInputType
    _sum?: MindmapNodeSumAggregateInputType
    _min?: MindmapNodeMinAggregateInputType
    _max?: MindmapNodeMaxAggregateInputType
  }

  export type MindmapNodeGroupByOutputType = {
    id: string
    title: string
    content: string
    parentId: string | null
    positionX: number
    positionY: number
    mindmapId: string
    _count: MindmapNodeCountAggregateOutputType | null
    _avg: MindmapNodeAvgAggregateOutputType | null
    _sum: MindmapNodeSumAggregateOutputType | null
    _min: MindmapNodeMinAggregateOutputType | null
    _max: MindmapNodeMaxAggregateOutputType | null
  }

  type GetMindmapNodeGroupByPayload<T extends MindmapNodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MindmapNodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MindmapNodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MindmapNodeGroupByOutputType[P]>
            : GetScalarType<T[P], MindmapNodeGroupByOutputType[P]>
        }
      >
    >


  export type MindmapNodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    parentId?: boolean
    positionX?: boolean
    positionY?: boolean
    mindmapId?: boolean
    mindmap?: boolean | MindmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mindmapNode"]>

  export type MindmapNodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    parentId?: boolean
    positionX?: boolean
    positionY?: boolean
    mindmapId?: boolean
    mindmap?: boolean | MindmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mindmapNode"]>

  export type MindmapNodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    parentId?: boolean
    positionX?: boolean
    positionY?: boolean
    mindmapId?: boolean
    mindmap?: boolean | MindmapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mindmapNode"]>

  export type MindmapNodeSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    parentId?: boolean
    positionX?: boolean
    positionY?: boolean
    mindmapId?: boolean
  }

  export type MindmapNodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "parentId" | "positionX" | "positionY" | "mindmapId", ExtArgs["result"]["mindmapNode"]>
  export type MindmapNodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mindmap?: boolean | MindmapDefaultArgs<ExtArgs>
  }
  export type MindmapNodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mindmap?: boolean | MindmapDefaultArgs<ExtArgs>
  }
  export type MindmapNodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mindmap?: boolean | MindmapDefaultArgs<ExtArgs>
  }

  export type $MindmapNodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MindmapNode"
    objects: {
      mindmap: Prisma.$MindmapPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      parentId: string | null
      positionX: number
      positionY: number
      mindmapId: string
    }, ExtArgs["result"]["mindmapNode"]>
    composites: {}
  }

  type MindmapNodeGetPayload<S extends boolean | null | undefined | MindmapNodeDefaultArgs> = $Result.GetResult<Prisma.$MindmapNodePayload, S>

  type MindmapNodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MindmapNodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MindmapNodeCountAggregateInputType | true
    }

  export interface MindmapNodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MindmapNode'], meta: { name: 'MindmapNode' } }
    /**
     * Find zero or one MindmapNode that matches the filter.
     * @param {MindmapNodeFindUniqueArgs} args - Arguments to find a MindmapNode
     * @example
     * // Get one MindmapNode
     * const mindmapNode = await prisma.mindmapNode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MindmapNodeFindUniqueArgs>(args: SelectSubset<T, MindmapNodeFindUniqueArgs<ExtArgs>>): Prisma__MindmapNodeClient<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MindmapNode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MindmapNodeFindUniqueOrThrowArgs} args - Arguments to find a MindmapNode
     * @example
     * // Get one MindmapNode
     * const mindmapNode = await prisma.mindmapNode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MindmapNodeFindUniqueOrThrowArgs>(args: SelectSubset<T, MindmapNodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MindmapNodeClient<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MindmapNode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapNodeFindFirstArgs} args - Arguments to find a MindmapNode
     * @example
     * // Get one MindmapNode
     * const mindmapNode = await prisma.mindmapNode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MindmapNodeFindFirstArgs>(args?: SelectSubset<T, MindmapNodeFindFirstArgs<ExtArgs>>): Prisma__MindmapNodeClient<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MindmapNode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapNodeFindFirstOrThrowArgs} args - Arguments to find a MindmapNode
     * @example
     * // Get one MindmapNode
     * const mindmapNode = await prisma.mindmapNode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MindmapNodeFindFirstOrThrowArgs>(args?: SelectSubset<T, MindmapNodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MindmapNodeClient<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MindmapNodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapNodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MindmapNodes
     * const mindmapNodes = await prisma.mindmapNode.findMany()
     * 
     * // Get first 10 MindmapNodes
     * const mindmapNodes = await prisma.mindmapNode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mindmapNodeWithIdOnly = await prisma.mindmapNode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MindmapNodeFindManyArgs>(args?: SelectSubset<T, MindmapNodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MindmapNode.
     * @param {MindmapNodeCreateArgs} args - Arguments to create a MindmapNode.
     * @example
     * // Create one MindmapNode
     * const MindmapNode = await prisma.mindmapNode.create({
     *   data: {
     *     // ... data to create a MindmapNode
     *   }
     * })
     * 
     */
    create<T extends MindmapNodeCreateArgs>(args: SelectSubset<T, MindmapNodeCreateArgs<ExtArgs>>): Prisma__MindmapNodeClient<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MindmapNodes.
     * @param {MindmapNodeCreateManyArgs} args - Arguments to create many MindmapNodes.
     * @example
     * // Create many MindmapNodes
     * const mindmapNode = await prisma.mindmapNode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MindmapNodeCreateManyArgs>(args?: SelectSubset<T, MindmapNodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MindmapNodes and returns the data saved in the database.
     * @param {MindmapNodeCreateManyAndReturnArgs} args - Arguments to create many MindmapNodes.
     * @example
     * // Create many MindmapNodes
     * const mindmapNode = await prisma.mindmapNode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MindmapNodes and only return the `id`
     * const mindmapNodeWithIdOnly = await prisma.mindmapNode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MindmapNodeCreateManyAndReturnArgs>(args?: SelectSubset<T, MindmapNodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MindmapNode.
     * @param {MindmapNodeDeleteArgs} args - Arguments to delete one MindmapNode.
     * @example
     * // Delete one MindmapNode
     * const MindmapNode = await prisma.mindmapNode.delete({
     *   where: {
     *     // ... filter to delete one MindmapNode
     *   }
     * })
     * 
     */
    delete<T extends MindmapNodeDeleteArgs>(args: SelectSubset<T, MindmapNodeDeleteArgs<ExtArgs>>): Prisma__MindmapNodeClient<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MindmapNode.
     * @param {MindmapNodeUpdateArgs} args - Arguments to update one MindmapNode.
     * @example
     * // Update one MindmapNode
     * const mindmapNode = await prisma.mindmapNode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MindmapNodeUpdateArgs>(args: SelectSubset<T, MindmapNodeUpdateArgs<ExtArgs>>): Prisma__MindmapNodeClient<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MindmapNodes.
     * @param {MindmapNodeDeleteManyArgs} args - Arguments to filter MindmapNodes to delete.
     * @example
     * // Delete a few MindmapNodes
     * const { count } = await prisma.mindmapNode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MindmapNodeDeleteManyArgs>(args?: SelectSubset<T, MindmapNodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MindmapNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapNodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MindmapNodes
     * const mindmapNode = await prisma.mindmapNode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MindmapNodeUpdateManyArgs>(args: SelectSubset<T, MindmapNodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MindmapNodes and returns the data updated in the database.
     * @param {MindmapNodeUpdateManyAndReturnArgs} args - Arguments to update many MindmapNodes.
     * @example
     * // Update many MindmapNodes
     * const mindmapNode = await prisma.mindmapNode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MindmapNodes and only return the `id`
     * const mindmapNodeWithIdOnly = await prisma.mindmapNode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MindmapNodeUpdateManyAndReturnArgs>(args: SelectSubset<T, MindmapNodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MindmapNode.
     * @param {MindmapNodeUpsertArgs} args - Arguments to update or create a MindmapNode.
     * @example
     * // Update or create a MindmapNode
     * const mindmapNode = await prisma.mindmapNode.upsert({
     *   create: {
     *     // ... data to create a MindmapNode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MindmapNode we want to update
     *   }
     * })
     */
    upsert<T extends MindmapNodeUpsertArgs>(args: SelectSubset<T, MindmapNodeUpsertArgs<ExtArgs>>): Prisma__MindmapNodeClient<$Result.GetResult<Prisma.$MindmapNodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MindmapNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapNodeCountArgs} args - Arguments to filter MindmapNodes to count.
     * @example
     * // Count the number of MindmapNodes
     * const count = await prisma.mindmapNode.count({
     *   where: {
     *     // ... the filter for the MindmapNodes we want to count
     *   }
     * })
    **/
    count<T extends MindmapNodeCountArgs>(
      args?: Subset<T, MindmapNodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MindmapNodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MindmapNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapNodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MindmapNodeAggregateArgs>(args: Subset<T, MindmapNodeAggregateArgs>): Prisma.PrismaPromise<GetMindmapNodeAggregateType<T>>

    /**
     * Group by MindmapNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MindmapNodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MindmapNodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MindmapNodeGroupByArgs['orderBy'] }
        : { orderBy?: MindmapNodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MindmapNodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMindmapNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MindmapNode model
   */
  readonly fields: MindmapNodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MindmapNode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MindmapNodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mindmap<T extends MindmapDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MindmapDefaultArgs<ExtArgs>>): Prisma__MindmapClient<$Result.GetResult<Prisma.$MindmapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MindmapNode model
   */
  interface MindmapNodeFieldRefs {
    readonly id: FieldRef<"MindmapNode", 'String'>
    readonly title: FieldRef<"MindmapNode", 'String'>
    readonly content: FieldRef<"MindmapNode", 'String'>
    readonly parentId: FieldRef<"MindmapNode", 'String'>
    readonly positionX: FieldRef<"MindmapNode", 'Float'>
    readonly positionY: FieldRef<"MindmapNode", 'Float'>
    readonly mindmapId: FieldRef<"MindmapNode", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MindmapNode findUnique
   */
  export type MindmapNodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which MindmapNode to fetch.
     */
    where: MindmapNodeWhereUniqueInput
  }

  /**
   * MindmapNode findUniqueOrThrow
   */
  export type MindmapNodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which MindmapNode to fetch.
     */
    where: MindmapNodeWhereUniqueInput
  }

  /**
   * MindmapNode findFirst
   */
  export type MindmapNodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which MindmapNode to fetch.
     */
    where?: MindmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MindmapNodes to fetch.
     */
    orderBy?: MindmapNodeOrderByWithRelationInput | MindmapNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MindmapNodes.
     */
    cursor?: MindmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MindmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MindmapNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MindmapNodes.
     */
    distinct?: MindmapNodeScalarFieldEnum | MindmapNodeScalarFieldEnum[]
  }

  /**
   * MindmapNode findFirstOrThrow
   */
  export type MindmapNodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which MindmapNode to fetch.
     */
    where?: MindmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MindmapNodes to fetch.
     */
    orderBy?: MindmapNodeOrderByWithRelationInput | MindmapNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MindmapNodes.
     */
    cursor?: MindmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MindmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MindmapNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MindmapNodes.
     */
    distinct?: MindmapNodeScalarFieldEnum | MindmapNodeScalarFieldEnum[]
  }

  /**
   * MindmapNode findMany
   */
  export type MindmapNodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    /**
     * Filter, which MindmapNodes to fetch.
     */
    where?: MindmapNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MindmapNodes to fetch.
     */
    orderBy?: MindmapNodeOrderByWithRelationInput | MindmapNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MindmapNodes.
     */
    cursor?: MindmapNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MindmapNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MindmapNodes.
     */
    skip?: number
    distinct?: MindmapNodeScalarFieldEnum | MindmapNodeScalarFieldEnum[]
  }

  /**
   * MindmapNode create
   */
  export type MindmapNodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    /**
     * The data needed to create a MindmapNode.
     */
    data: XOR<MindmapNodeCreateInput, MindmapNodeUncheckedCreateInput>
  }

  /**
   * MindmapNode createMany
   */
  export type MindmapNodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MindmapNodes.
     */
    data: MindmapNodeCreateManyInput | MindmapNodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MindmapNode createManyAndReturn
   */
  export type MindmapNodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * The data used to create many MindmapNodes.
     */
    data: MindmapNodeCreateManyInput | MindmapNodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MindmapNode update
   */
  export type MindmapNodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    /**
     * The data needed to update a MindmapNode.
     */
    data: XOR<MindmapNodeUpdateInput, MindmapNodeUncheckedUpdateInput>
    /**
     * Choose, which MindmapNode to update.
     */
    where: MindmapNodeWhereUniqueInput
  }

  /**
   * MindmapNode updateMany
   */
  export type MindmapNodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MindmapNodes.
     */
    data: XOR<MindmapNodeUpdateManyMutationInput, MindmapNodeUncheckedUpdateManyInput>
    /**
     * Filter which MindmapNodes to update
     */
    where?: MindmapNodeWhereInput
    /**
     * Limit how many MindmapNodes to update.
     */
    limit?: number
  }

  /**
   * MindmapNode updateManyAndReturn
   */
  export type MindmapNodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * The data used to update MindmapNodes.
     */
    data: XOR<MindmapNodeUpdateManyMutationInput, MindmapNodeUncheckedUpdateManyInput>
    /**
     * Filter which MindmapNodes to update
     */
    where?: MindmapNodeWhereInput
    /**
     * Limit how many MindmapNodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MindmapNode upsert
   */
  export type MindmapNodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    /**
     * The filter to search for the MindmapNode to update in case it exists.
     */
    where: MindmapNodeWhereUniqueInput
    /**
     * In case the MindmapNode found by the `where` argument doesn't exist, create a new MindmapNode with this data.
     */
    create: XOR<MindmapNodeCreateInput, MindmapNodeUncheckedCreateInput>
    /**
     * In case the MindmapNode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MindmapNodeUpdateInput, MindmapNodeUncheckedUpdateInput>
  }

  /**
   * MindmapNode delete
   */
  export type MindmapNodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
    /**
     * Filter which MindmapNode to delete.
     */
    where: MindmapNodeWhereUniqueInput
  }

  /**
   * MindmapNode deleteMany
   */
  export type MindmapNodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MindmapNodes to delete
     */
    where?: MindmapNodeWhereInput
    /**
     * Limit how many MindmapNodes to delete.
     */
    limit?: number
  }

  /**
   * MindmapNode without action
   */
  export type MindmapNodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MindmapNode
     */
    select?: MindmapNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MindmapNode
     */
    omit?: MindmapNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MindmapNodeInclude<ExtArgs> | null
  }


  /**
   * Model Request
   */

  export type AggregateRequest = {
    _count: RequestCountAggregateOutputType | null
    _avg: RequestAvgAggregateOutputType | null
    _sum: RequestSumAggregateOutputType | null
    _min: RequestMinAggregateOutputType | null
    _max: RequestMaxAggregateOutputType | null
  }

  export type RequestAvgAggregateOutputType = {
    maxLength: number | null
    minLength: number | null
    processingTime: number | null
  }

  export type RequestSumAggregateOutputType = {
    maxLength: number | null
    minLength: number | null
    processingTime: number | null
  }

  export type RequestMinAggregateOutputType = {
    id: string | null
    type: $Enums.RequestType | null
    content: string | null
    language: string | null
    maxLength: number | null
    minLength: number | null
    summary: string | null
    error: string | null
    status: $Enums.RequestStatus | null
    processingTime: number | null
    modelUsed: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RequestMaxAggregateOutputType = {
    id: string | null
    type: $Enums.RequestType | null
    content: string | null
    language: string | null
    maxLength: number | null
    minLength: number | null
    summary: string | null
    error: string | null
    status: $Enums.RequestStatus | null
    processingTime: number | null
    modelUsed: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RequestCountAggregateOutputType = {
    id: number
    type: number
    content: number
    language: number
    maxLength: number
    minLength: number
    summary: number
    error: number
    status: number
    processingTime: number
    modelUsed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RequestAvgAggregateInputType = {
    maxLength?: true
    minLength?: true
    processingTime?: true
  }

  export type RequestSumAggregateInputType = {
    maxLength?: true
    minLength?: true
    processingTime?: true
  }

  export type RequestMinAggregateInputType = {
    id?: true
    type?: true
    content?: true
    language?: true
    maxLength?: true
    minLength?: true
    summary?: true
    error?: true
    status?: true
    processingTime?: true
    modelUsed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RequestMaxAggregateInputType = {
    id?: true
    type?: true
    content?: true
    language?: true
    maxLength?: true
    minLength?: true
    summary?: true
    error?: true
    status?: true
    processingTime?: true
    modelUsed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RequestCountAggregateInputType = {
    id?: true
    type?: true
    content?: true
    language?: true
    maxLength?: true
    minLength?: true
    summary?: true
    error?: true
    status?: true
    processingTime?: true
    modelUsed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Request to aggregate.
     */
    where?: RequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Requests to fetch.
     */
    orderBy?: RequestOrderByWithRelationInput | RequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Requests
    **/
    _count?: true | RequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestMaxAggregateInputType
  }

  export type GetRequestAggregateType<T extends RequestAggregateArgs> = {
        [P in keyof T & keyof AggregateRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequest[P]>
      : GetScalarType<T[P], AggregateRequest[P]>
  }




  export type RequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestWhereInput
    orderBy?: RequestOrderByWithAggregationInput | RequestOrderByWithAggregationInput[]
    by: RequestScalarFieldEnum[] | RequestScalarFieldEnum
    having?: RequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestCountAggregateInputType | true
    _avg?: RequestAvgAggregateInputType
    _sum?: RequestSumAggregateInputType
    _min?: RequestMinAggregateInputType
    _max?: RequestMaxAggregateInputType
  }

  export type RequestGroupByOutputType = {
    id: string
    type: $Enums.RequestType
    content: string
    language: string | null
    maxLength: number | null
    minLength: number | null
    summary: string | null
    error: string | null
    status: $Enums.RequestStatus
    processingTime: number | null
    modelUsed: string | null
    createdAt: Date
    updatedAt: Date
    _count: RequestCountAggregateOutputType | null
    _avg: RequestAvgAggregateOutputType | null
    _sum: RequestSumAggregateOutputType | null
    _min: RequestMinAggregateOutputType | null
    _max: RequestMaxAggregateOutputType | null
  }

  type GetRequestGroupByPayload<T extends RequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestGroupByOutputType[P]>
            : GetScalarType<T[P], RequestGroupByOutputType[P]>
        }
      >
    >


  export type RequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    content?: boolean
    language?: boolean
    maxLength?: boolean
    minLength?: boolean
    summary?: boolean
    error?: boolean
    status?: boolean
    processingTime?: boolean
    modelUsed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["request"]>

  export type RequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    content?: boolean
    language?: boolean
    maxLength?: boolean
    minLength?: boolean
    summary?: boolean
    error?: boolean
    status?: boolean
    processingTime?: boolean
    modelUsed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["request"]>

  export type RequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    content?: boolean
    language?: boolean
    maxLength?: boolean
    minLength?: boolean
    summary?: boolean
    error?: boolean
    status?: boolean
    processingTime?: boolean
    modelUsed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["request"]>

  export type RequestSelectScalar = {
    id?: boolean
    type?: boolean
    content?: boolean
    language?: boolean
    maxLength?: boolean
    minLength?: boolean
    summary?: boolean
    error?: boolean
    status?: boolean
    processingTime?: boolean
    modelUsed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "content" | "language" | "maxLength" | "minLength" | "summary" | "error" | "status" | "processingTime" | "modelUsed" | "createdAt" | "updatedAt", ExtArgs["result"]["request"]>

  export type $RequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Request"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.RequestType
      content: string
      language: string | null
      maxLength: number | null
      minLength: number | null
      summary: string | null
      error: string | null
      status: $Enums.RequestStatus
      processingTime: number | null
      modelUsed: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["request"]>
    composites: {}
  }

  type RequestGetPayload<S extends boolean | null | undefined | RequestDefaultArgs> = $Result.GetResult<Prisma.$RequestPayload, S>

  type RequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestCountAggregateInputType | true
    }

  export interface RequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Request'], meta: { name: 'Request' } }
    /**
     * Find zero or one Request that matches the filter.
     * @param {RequestFindUniqueArgs} args - Arguments to find a Request
     * @example
     * // Get one Request
     * const request = await prisma.request.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestFindUniqueArgs>(args: SelectSubset<T, RequestFindUniqueArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Request that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestFindUniqueOrThrowArgs} args - Arguments to find a Request
     * @example
     * // Get one Request
     * const request = await prisma.request.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Request that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestFindFirstArgs} args - Arguments to find a Request
     * @example
     * // Get one Request
     * const request = await prisma.request.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestFindFirstArgs>(args?: SelectSubset<T, RequestFindFirstArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Request that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestFindFirstOrThrowArgs} args - Arguments to find a Request
     * @example
     * // Get one Request
     * const request = await prisma.request.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Requests
     * const requests = await prisma.request.findMany()
     * 
     * // Get first 10 Requests
     * const requests = await prisma.request.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestWithIdOnly = await prisma.request.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestFindManyArgs>(args?: SelectSubset<T, RequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Request.
     * @param {RequestCreateArgs} args - Arguments to create a Request.
     * @example
     * // Create one Request
     * const Request = await prisma.request.create({
     *   data: {
     *     // ... data to create a Request
     *   }
     * })
     * 
     */
    create<T extends RequestCreateArgs>(args: SelectSubset<T, RequestCreateArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Requests.
     * @param {RequestCreateManyArgs} args - Arguments to create many Requests.
     * @example
     * // Create many Requests
     * const request = await prisma.request.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestCreateManyArgs>(args?: SelectSubset<T, RequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Requests and returns the data saved in the database.
     * @param {RequestCreateManyAndReturnArgs} args - Arguments to create many Requests.
     * @example
     * // Create many Requests
     * const request = await prisma.request.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Requests and only return the `id`
     * const requestWithIdOnly = await prisma.request.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Request.
     * @param {RequestDeleteArgs} args - Arguments to delete one Request.
     * @example
     * // Delete one Request
     * const Request = await prisma.request.delete({
     *   where: {
     *     // ... filter to delete one Request
     *   }
     * })
     * 
     */
    delete<T extends RequestDeleteArgs>(args: SelectSubset<T, RequestDeleteArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Request.
     * @param {RequestUpdateArgs} args - Arguments to update one Request.
     * @example
     * // Update one Request
     * const request = await prisma.request.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestUpdateArgs>(args: SelectSubset<T, RequestUpdateArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Requests.
     * @param {RequestDeleteManyArgs} args - Arguments to filter Requests to delete.
     * @example
     * // Delete a few Requests
     * const { count } = await prisma.request.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestDeleteManyArgs>(args?: SelectSubset<T, RequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Requests
     * const request = await prisma.request.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestUpdateManyArgs>(args: SelectSubset<T, RequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Requests and returns the data updated in the database.
     * @param {RequestUpdateManyAndReturnArgs} args - Arguments to update many Requests.
     * @example
     * // Update many Requests
     * const request = await prisma.request.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Requests and only return the `id`
     * const requestWithIdOnly = await prisma.request.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Request.
     * @param {RequestUpsertArgs} args - Arguments to update or create a Request.
     * @example
     * // Update or create a Request
     * const request = await prisma.request.upsert({
     *   create: {
     *     // ... data to create a Request
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Request we want to update
     *   }
     * })
     */
    upsert<T extends RequestUpsertArgs>(args: SelectSubset<T, RequestUpsertArgs<ExtArgs>>): Prisma__RequestClient<$Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestCountArgs} args - Arguments to filter Requests to count.
     * @example
     * // Count the number of Requests
     * const count = await prisma.request.count({
     *   where: {
     *     // ... the filter for the Requests we want to count
     *   }
     * })
    **/
    count<T extends RequestCountArgs>(
      args?: Subset<T, RequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Request.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestAggregateArgs>(args: Subset<T, RequestAggregateArgs>): Prisma.PrismaPromise<GetRequestAggregateType<T>>

    /**
     * Group by Request.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestGroupByArgs['orderBy'] }
        : { orderBy?: RequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Request model
   */
  readonly fields: RequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Request.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Request model
   */
  interface RequestFieldRefs {
    readonly id: FieldRef<"Request", 'String'>
    readonly type: FieldRef<"Request", 'RequestType'>
    readonly content: FieldRef<"Request", 'String'>
    readonly language: FieldRef<"Request", 'String'>
    readonly maxLength: FieldRef<"Request", 'Int'>
    readonly minLength: FieldRef<"Request", 'Int'>
    readonly summary: FieldRef<"Request", 'String'>
    readonly error: FieldRef<"Request", 'String'>
    readonly status: FieldRef<"Request", 'RequestStatus'>
    readonly processingTime: FieldRef<"Request", 'Int'>
    readonly modelUsed: FieldRef<"Request", 'String'>
    readonly createdAt: FieldRef<"Request", 'DateTime'>
    readonly updatedAt: FieldRef<"Request", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Request findUnique
   */
  export type RequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Request to fetch.
     */
    where: RequestWhereUniqueInput
  }

  /**
   * Request findUniqueOrThrow
   */
  export type RequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Request to fetch.
     */
    where: RequestWhereUniqueInput
  }

  /**
   * Request findFirst
   */
  export type RequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Request to fetch.
     */
    where?: RequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Requests to fetch.
     */
    orderBy?: RequestOrderByWithRelationInput | RequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Requests.
     */
    cursor?: RequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Requests.
     */
    distinct?: RequestScalarFieldEnum | RequestScalarFieldEnum[]
  }

  /**
   * Request findFirstOrThrow
   */
  export type RequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Request to fetch.
     */
    where?: RequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Requests to fetch.
     */
    orderBy?: RequestOrderByWithRelationInput | RequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Requests.
     */
    cursor?: RequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Requests.
     */
    distinct?: RequestScalarFieldEnum | RequestScalarFieldEnum[]
  }

  /**
   * Request findMany
   */
  export type RequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter, which Requests to fetch.
     */
    where?: RequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Requests to fetch.
     */
    orderBy?: RequestOrderByWithRelationInput | RequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Requests.
     */
    cursor?: RequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Requests.
     */
    skip?: number
    distinct?: RequestScalarFieldEnum | RequestScalarFieldEnum[]
  }

  /**
   * Request create
   */
  export type RequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The data needed to create a Request.
     */
    data: XOR<RequestCreateInput, RequestUncheckedCreateInput>
  }

  /**
   * Request createMany
   */
  export type RequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Requests.
     */
    data: RequestCreateManyInput | RequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Request createManyAndReturn
   */
  export type RequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The data used to create many Requests.
     */
    data: RequestCreateManyInput | RequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Request update
   */
  export type RequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The data needed to update a Request.
     */
    data: XOR<RequestUpdateInput, RequestUncheckedUpdateInput>
    /**
     * Choose, which Request to update.
     */
    where: RequestWhereUniqueInput
  }

  /**
   * Request updateMany
   */
  export type RequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Requests.
     */
    data: XOR<RequestUpdateManyMutationInput, RequestUncheckedUpdateManyInput>
    /**
     * Filter which Requests to update
     */
    where?: RequestWhereInput
    /**
     * Limit how many Requests to update.
     */
    limit?: number
  }

  /**
   * Request updateManyAndReturn
   */
  export type RequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The data used to update Requests.
     */
    data: XOR<RequestUpdateManyMutationInput, RequestUncheckedUpdateManyInput>
    /**
     * Filter which Requests to update
     */
    where?: RequestWhereInput
    /**
     * Limit how many Requests to update.
     */
    limit?: number
  }

  /**
   * Request upsert
   */
  export type RequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * The filter to search for the Request to update in case it exists.
     */
    where: RequestWhereUniqueInput
    /**
     * In case the Request found by the `where` argument doesn't exist, create a new Request with this data.
     */
    create: XOR<RequestCreateInput, RequestUncheckedCreateInput>
    /**
     * In case the Request was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestUpdateInput, RequestUncheckedUpdateInput>
  }

  /**
   * Request delete
   */
  export type RequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
    /**
     * Filter which Request to delete.
     */
    where: RequestWhereUniqueInput
  }

  /**
   * Request deleteMany
   */
  export type RequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Requests to delete
     */
    where?: RequestWhereInput
    /**
     * Limit how many Requests to delete.
     */
    limit?: number
  }

  /**
   * Request without action
   */
  export type RequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Request
     */
    select?: RequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Request
     */
    omit?: RequestOmit<ExtArgs> | null
  }


  /**
   * Model Flashcard
   */

  export type AggregateFlashcard = {
    _count: FlashcardCountAggregateOutputType | null
    _min: FlashcardMinAggregateOutputType | null
    _max: FlashcardMaxAggregateOutputType | null
  }

  export type FlashcardMinAggregateOutputType = {
    id: string | null
    front: string | null
    back: string | null
    topic: string | null
    difficulty: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FlashcardMaxAggregateOutputType = {
    id: string | null
    front: string | null
    back: string | null
    topic: string | null
    difficulty: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FlashcardCountAggregateOutputType = {
    id: number
    front: number
    back: number
    topic: number
    difficulty: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FlashcardMinAggregateInputType = {
    id?: true
    front?: true
    back?: true
    topic?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FlashcardMaxAggregateInputType = {
    id?: true
    front?: true
    back?: true
    topic?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FlashcardCountAggregateInputType = {
    id?: true
    front?: true
    back?: true
    topic?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FlashcardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flashcard to aggregate.
     */
    where?: FlashcardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flashcards to fetch.
     */
    orderBy?: FlashcardOrderByWithRelationInput | FlashcardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FlashcardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flashcards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flashcards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Flashcards
    **/
    _count?: true | FlashcardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FlashcardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FlashcardMaxAggregateInputType
  }

  export type GetFlashcardAggregateType<T extends FlashcardAggregateArgs> = {
        [P in keyof T & keyof AggregateFlashcard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFlashcard[P]>
      : GetScalarType<T[P], AggregateFlashcard[P]>
  }




  export type FlashcardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlashcardWhereInput
    orderBy?: FlashcardOrderByWithAggregationInput | FlashcardOrderByWithAggregationInput[]
    by: FlashcardScalarFieldEnum[] | FlashcardScalarFieldEnum
    having?: FlashcardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FlashcardCountAggregateInputType | true
    _min?: FlashcardMinAggregateInputType
    _max?: FlashcardMaxAggregateInputType
  }

  export type FlashcardGroupByOutputType = {
    id: string
    front: string
    back: string
    topic: string
    difficulty: string
    createdAt: Date
    updatedAt: Date
    _count: FlashcardCountAggregateOutputType | null
    _min: FlashcardMinAggregateOutputType | null
    _max: FlashcardMaxAggregateOutputType | null
  }

  type GetFlashcardGroupByPayload<T extends FlashcardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FlashcardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FlashcardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FlashcardGroupByOutputType[P]>
            : GetScalarType<T[P], FlashcardGroupByOutputType[P]>
        }
      >
    >


  export type FlashcardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    front?: boolean
    back?: boolean
    topic?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["flashcard"]>

  export type FlashcardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    front?: boolean
    back?: boolean
    topic?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["flashcard"]>

  export type FlashcardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    front?: boolean
    back?: boolean
    topic?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["flashcard"]>

  export type FlashcardSelectScalar = {
    id?: boolean
    front?: boolean
    back?: boolean
    topic?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FlashcardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "front" | "back" | "topic" | "difficulty" | "createdAt" | "updatedAt", ExtArgs["result"]["flashcard"]>

  export type $FlashcardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Flashcard"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      front: string
      back: string
      topic: string
      difficulty: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["flashcard"]>
    composites: {}
  }

  type FlashcardGetPayload<S extends boolean | null | undefined | FlashcardDefaultArgs> = $Result.GetResult<Prisma.$FlashcardPayload, S>

  type FlashcardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FlashcardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FlashcardCountAggregateInputType | true
    }

  export interface FlashcardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Flashcard'], meta: { name: 'Flashcard' } }
    /**
     * Find zero or one Flashcard that matches the filter.
     * @param {FlashcardFindUniqueArgs} args - Arguments to find a Flashcard
     * @example
     * // Get one Flashcard
     * const flashcard = await prisma.flashcard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlashcardFindUniqueArgs>(args: SelectSubset<T, FlashcardFindUniqueArgs<ExtArgs>>): Prisma__FlashcardClient<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Flashcard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlashcardFindUniqueOrThrowArgs} args - Arguments to find a Flashcard
     * @example
     * // Get one Flashcard
     * const flashcard = await prisma.flashcard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlashcardFindUniqueOrThrowArgs>(args: SelectSubset<T, FlashcardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FlashcardClient<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flashcard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlashcardFindFirstArgs} args - Arguments to find a Flashcard
     * @example
     * // Get one Flashcard
     * const flashcard = await prisma.flashcard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlashcardFindFirstArgs>(args?: SelectSubset<T, FlashcardFindFirstArgs<ExtArgs>>): Prisma__FlashcardClient<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flashcard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlashcardFindFirstOrThrowArgs} args - Arguments to find a Flashcard
     * @example
     * // Get one Flashcard
     * const flashcard = await prisma.flashcard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlashcardFindFirstOrThrowArgs>(args?: SelectSubset<T, FlashcardFindFirstOrThrowArgs<ExtArgs>>): Prisma__FlashcardClient<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Flashcards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlashcardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Flashcards
     * const flashcards = await prisma.flashcard.findMany()
     * 
     * // Get first 10 Flashcards
     * const flashcards = await prisma.flashcard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const flashcardWithIdOnly = await prisma.flashcard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FlashcardFindManyArgs>(args?: SelectSubset<T, FlashcardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Flashcard.
     * @param {FlashcardCreateArgs} args - Arguments to create a Flashcard.
     * @example
     * // Create one Flashcard
     * const Flashcard = await prisma.flashcard.create({
     *   data: {
     *     // ... data to create a Flashcard
     *   }
     * })
     * 
     */
    create<T extends FlashcardCreateArgs>(args: SelectSubset<T, FlashcardCreateArgs<ExtArgs>>): Prisma__FlashcardClient<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Flashcards.
     * @param {FlashcardCreateManyArgs} args - Arguments to create many Flashcards.
     * @example
     * // Create many Flashcards
     * const flashcard = await prisma.flashcard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FlashcardCreateManyArgs>(args?: SelectSubset<T, FlashcardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Flashcards and returns the data saved in the database.
     * @param {FlashcardCreateManyAndReturnArgs} args - Arguments to create many Flashcards.
     * @example
     * // Create many Flashcards
     * const flashcard = await prisma.flashcard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Flashcards and only return the `id`
     * const flashcardWithIdOnly = await prisma.flashcard.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FlashcardCreateManyAndReturnArgs>(args?: SelectSubset<T, FlashcardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Flashcard.
     * @param {FlashcardDeleteArgs} args - Arguments to delete one Flashcard.
     * @example
     * // Delete one Flashcard
     * const Flashcard = await prisma.flashcard.delete({
     *   where: {
     *     // ... filter to delete one Flashcard
     *   }
     * })
     * 
     */
    delete<T extends FlashcardDeleteArgs>(args: SelectSubset<T, FlashcardDeleteArgs<ExtArgs>>): Prisma__FlashcardClient<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Flashcard.
     * @param {FlashcardUpdateArgs} args - Arguments to update one Flashcard.
     * @example
     * // Update one Flashcard
     * const flashcard = await prisma.flashcard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FlashcardUpdateArgs>(args: SelectSubset<T, FlashcardUpdateArgs<ExtArgs>>): Prisma__FlashcardClient<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Flashcards.
     * @param {FlashcardDeleteManyArgs} args - Arguments to filter Flashcards to delete.
     * @example
     * // Delete a few Flashcards
     * const { count } = await prisma.flashcard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FlashcardDeleteManyArgs>(args?: SelectSubset<T, FlashcardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flashcards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlashcardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Flashcards
     * const flashcard = await prisma.flashcard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FlashcardUpdateManyArgs>(args: SelectSubset<T, FlashcardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flashcards and returns the data updated in the database.
     * @param {FlashcardUpdateManyAndReturnArgs} args - Arguments to update many Flashcards.
     * @example
     * // Update many Flashcards
     * const flashcard = await prisma.flashcard.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Flashcards and only return the `id`
     * const flashcardWithIdOnly = await prisma.flashcard.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FlashcardUpdateManyAndReturnArgs>(args: SelectSubset<T, FlashcardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Flashcard.
     * @param {FlashcardUpsertArgs} args - Arguments to update or create a Flashcard.
     * @example
     * // Update or create a Flashcard
     * const flashcard = await prisma.flashcard.upsert({
     *   create: {
     *     // ... data to create a Flashcard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Flashcard we want to update
     *   }
     * })
     */
    upsert<T extends FlashcardUpsertArgs>(args: SelectSubset<T, FlashcardUpsertArgs<ExtArgs>>): Prisma__FlashcardClient<$Result.GetResult<Prisma.$FlashcardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Flashcards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlashcardCountArgs} args - Arguments to filter Flashcards to count.
     * @example
     * // Count the number of Flashcards
     * const count = await prisma.flashcard.count({
     *   where: {
     *     // ... the filter for the Flashcards we want to count
     *   }
     * })
    **/
    count<T extends FlashcardCountArgs>(
      args?: Subset<T, FlashcardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FlashcardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Flashcard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlashcardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FlashcardAggregateArgs>(args: Subset<T, FlashcardAggregateArgs>): Prisma.PrismaPromise<GetFlashcardAggregateType<T>>

    /**
     * Group by Flashcard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlashcardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FlashcardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FlashcardGroupByArgs['orderBy'] }
        : { orderBy?: FlashcardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FlashcardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlashcardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Flashcard model
   */
  readonly fields: FlashcardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Flashcard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FlashcardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Flashcard model
   */
  interface FlashcardFieldRefs {
    readonly id: FieldRef<"Flashcard", 'String'>
    readonly front: FieldRef<"Flashcard", 'String'>
    readonly back: FieldRef<"Flashcard", 'String'>
    readonly topic: FieldRef<"Flashcard", 'String'>
    readonly difficulty: FieldRef<"Flashcard", 'String'>
    readonly createdAt: FieldRef<"Flashcard", 'DateTime'>
    readonly updatedAt: FieldRef<"Flashcard", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Flashcard findUnique
   */
  export type FlashcardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * Filter, which Flashcard to fetch.
     */
    where: FlashcardWhereUniqueInput
  }

  /**
   * Flashcard findUniqueOrThrow
   */
  export type FlashcardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * Filter, which Flashcard to fetch.
     */
    where: FlashcardWhereUniqueInput
  }

  /**
   * Flashcard findFirst
   */
  export type FlashcardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * Filter, which Flashcard to fetch.
     */
    where?: FlashcardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flashcards to fetch.
     */
    orderBy?: FlashcardOrderByWithRelationInput | FlashcardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flashcards.
     */
    cursor?: FlashcardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flashcards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flashcards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flashcards.
     */
    distinct?: FlashcardScalarFieldEnum | FlashcardScalarFieldEnum[]
  }

  /**
   * Flashcard findFirstOrThrow
   */
  export type FlashcardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * Filter, which Flashcard to fetch.
     */
    where?: FlashcardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flashcards to fetch.
     */
    orderBy?: FlashcardOrderByWithRelationInput | FlashcardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flashcards.
     */
    cursor?: FlashcardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flashcards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flashcards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flashcards.
     */
    distinct?: FlashcardScalarFieldEnum | FlashcardScalarFieldEnum[]
  }

  /**
   * Flashcard findMany
   */
  export type FlashcardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * Filter, which Flashcards to fetch.
     */
    where?: FlashcardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flashcards to fetch.
     */
    orderBy?: FlashcardOrderByWithRelationInput | FlashcardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Flashcards.
     */
    cursor?: FlashcardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flashcards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flashcards.
     */
    skip?: number
    distinct?: FlashcardScalarFieldEnum | FlashcardScalarFieldEnum[]
  }

  /**
   * Flashcard create
   */
  export type FlashcardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * The data needed to create a Flashcard.
     */
    data: XOR<FlashcardCreateInput, FlashcardUncheckedCreateInput>
  }

  /**
   * Flashcard createMany
   */
  export type FlashcardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Flashcards.
     */
    data: FlashcardCreateManyInput | FlashcardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Flashcard createManyAndReturn
   */
  export type FlashcardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * The data used to create many Flashcards.
     */
    data: FlashcardCreateManyInput | FlashcardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Flashcard update
   */
  export type FlashcardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * The data needed to update a Flashcard.
     */
    data: XOR<FlashcardUpdateInput, FlashcardUncheckedUpdateInput>
    /**
     * Choose, which Flashcard to update.
     */
    where: FlashcardWhereUniqueInput
  }

  /**
   * Flashcard updateMany
   */
  export type FlashcardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Flashcards.
     */
    data: XOR<FlashcardUpdateManyMutationInput, FlashcardUncheckedUpdateManyInput>
    /**
     * Filter which Flashcards to update
     */
    where?: FlashcardWhereInput
    /**
     * Limit how many Flashcards to update.
     */
    limit?: number
  }

  /**
   * Flashcard updateManyAndReturn
   */
  export type FlashcardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * The data used to update Flashcards.
     */
    data: XOR<FlashcardUpdateManyMutationInput, FlashcardUncheckedUpdateManyInput>
    /**
     * Filter which Flashcards to update
     */
    where?: FlashcardWhereInput
    /**
     * Limit how many Flashcards to update.
     */
    limit?: number
  }

  /**
   * Flashcard upsert
   */
  export type FlashcardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * The filter to search for the Flashcard to update in case it exists.
     */
    where: FlashcardWhereUniqueInput
    /**
     * In case the Flashcard found by the `where` argument doesn't exist, create a new Flashcard with this data.
     */
    create: XOR<FlashcardCreateInput, FlashcardUncheckedCreateInput>
    /**
     * In case the Flashcard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FlashcardUpdateInput, FlashcardUncheckedUpdateInput>
  }

  /**
   * Flashcard delete
   */
  export type FlashcardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
    /**
     * Filter which Flashcard to delete.
     */
    where: FlashcardWhereUniqueInput
  }

  /**
   * Flashcard deleteMany
   */
  export type FlashcardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flashcards to delete
     */
    where?: FlashcardWhereInput
    /**
     * Limit how many Flashcards to delete.
     */
    limit?: number
  }

  /**
   * Flashcard without action
   */
  export type FlashcardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flashcard
     */
    select?: FlashcardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flashcard
     */
    omit?: FlashcardOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MindmapScalarFieldEnum: {
    id: 'id',
    title: 'title',
    topic: 'topic',
    difficulty: 'difficulty',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MindmapScalarFieldEnum = (typeof MindmapScalarFieldEnum)[keyof typeof MindmapScalarFieldEnum]


  export const MindmapNodeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    parentId: 'parentId',
    positionX: 'positionX',
    positionY: 'positionY',
    mindmapId: 'mindmapId'
  };

  export type MindmapNodeScalarFieldEnum = (typeof MindmapNodeScalarFieldEnum)[keyof typeof MindmapNodeScalarFieldEnum]


  export const RequestScalarFieldEnum: {
    id: 'id',
    type: 'type',
    content: 'content',
    language: 'language',
    maxLength: 'maxLength',
    minLength: 'minLength',
    summary: 'summary',
    error: 'error',
    status: 'status',
    processingTime: 'processingTime',
    modelUsed: 'modelUsed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RequestScalarFieldEnum = (typeof RequestScalarFieldEnum)[keyof typeof RequestScalarFieldEnum]


  export const FlashcardScalarFieldEnum: {
    id: 'id',
    front: 'front',
    back: 'back',
    topic: 'topic',
    difficulty: 'difficulty',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FlashcardScalarFieldEnum = (typeof FlashcardScalarFieldEnum)[keyof typeof FlashcardScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'RequestType'
   */
  export type EnumRequestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestType'>
    


  /**
   * Reference to a field of type 'RequestType[]'
   */
  export type ListEnumRequestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RequestStatus'
   */
  export type EnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus'>
    


  /**
   * Reference to a field of type 'RequestStatus[]'
   */
  export type ListEnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type MindmapWhereInput = {
    AND?: MindmapWhereInput | MindmapWhereInput[]
    OR?: MindmapWhereInput[]
    NOT?: MindmapWhereInput | MindmapWhereInput[]
    id?: StringFilter<"Mindmap"> | string
    title?: StringFilter<"Mindmap"> | string
    topic?: StringFilter<"Mindmap"> | string
    difficulty?: StringFilter<"Mindmap"> | string
    createdAt?: DateTimeFilter<"Mindmap"> | Date | string
    updatedAt?: DateTimeFilter<"Mindmap"> | Date | string
    nodes?: MindmapNodeListRelationFilter
  }

  export type MindmapOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    nodes?: MindmapNodeOrderByRelationAggregateInput
  }

  export type MindmapWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MindmapWhereInput | MindmapWhereInput[]
    OR?: MindmapWhereInput[]
    NOT?: MindmapWhereInput | MindmapWhereInput[]
    title?: StringFilter<"Mindmap"> | string
    topic?: StringFilter<"Mindmap"> | string
    difficulty?: StringFilter<"Mindmap"> | string
    createdAt?: DateTimeFilter<"Mindmap"> | Date | string
    updatedAt?: DateTimeFilter<"Mindmap"> | Date | string
    nodes?: MindmapNodeListRelationFilter
  }, "id">

  export type MindmapOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MindmapCountOrderByAggregateInput
    _max?: MindmapMaxOrderByAggregateInput
    _min?: MindmapMinOrderByAggregateInput
  }

  export type MindmapScalarWhereWithAggregatesInput = {
    AND?: MindmapScalarWhereWithAggregatesInput | MindmapScalarWhereWithAggregatesInput[]
    OR?: MindmapScalarWhereWithAggregatesInput[]
    NOT?: MindmapScalarWhereWithAggregatesInput | MindmapScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mindmap"> | string
    title?: StringWithAggregatesFilter<"Mindmap"> | string
    topic?: StringWithAggregatesFilter<"Mindmap"> | string
    difficulty?: StringWithAggregatesFilter<"Mindmap"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Mindmap"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mindmap"> | Date | string
  }

  export type MindmapNodeWhereInput = {
    AND?: MindmapNodeWhereInput | MindmapNodeWhereInput[]
    OR?: MindmapNodeWhereInput[]
    NOT?: MindmapNodeWhereInput | MindmapNodeWhereInput[]
    id?: StringFilter<"MindmapNode"> | string
    title?: StringFilter<"MindmapNode"> | string
    content?: StringFilter<"MindmapNode"> | string
    parentId?: StringNullableFilter<"MindmapNode"> | string | null
    positionX?: FloatFilter<"MindmapNode"> | number
    positionY?: FloatFilter<"MindmapNode"> | number
    mindmapId?: StringFilter<"MindmapNode"> | string
    mindmap?: XOR<MindmapScalarRelationFilter, MindmapWhereInput>
  }

  export type MindmapNodeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    parentId?: SortOrderInput | SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    mindmapId?: SortOrder
    mindmap?: MindmapOrderByWithRelationInput
  }

  export type MindmapNodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MindmapNodeWhereInput | MindmapNodeWhereInput[]
    OR?: MindmapNodeWhereInput[]
    NOT?: MindmapNodeWhereInput | MindmapNodeWhereInput[]
    title?: StringFilter<"MindmapNode"> | string
    content?: StringFilter<"MindmapNode"> | string
    parentId?: StringNullableFilter<"MindmapNode"> | string | null
    positionX?: FloatFilter<"MindmapNode"> | number
    positionY?: FloatFilter<"MindmapNode"> | number
    mindmapId?: StringFilter<"MindmapNode"> | string
    mindmap?: XOR<MindmapScalarRelationFilter, MindmapWhereInput>
  }, "id">

  export type MindmapNodeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    parentId?: SortOrderInput | SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    mindmapId?: SortOrder
    _count?: MindmapNodeCountOrderByAggregateInput
    _avg?: MindmapNodeAvgOrderByAggregateInput
    _max?: MindmapNodeMaxOrderByAggregateInput
    _min?: MindmapNodeMinOrderByAggregateInput
    _sum?: MindmapNodeSumOrderByAggregateInput
  }

  export type MindmapNodeScalarWhereWithAggregatesInput = {
    AND?: MindmapNodeScalarWhereWithAggregatesInput | MindmapNodeScalarWhereWithAggregatesInput[]
    OR?: MindmapNodeScalarWhereWithAggregatesInput[]
    NOT?: MindmapNodeScalarWhereWithAggregatesInput | MindmapNodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MindmapNode"> | string
    title?: StringWithAggregatesFilter<"MindmapNode"> | string
    content?: StringWithAggregatesFilter<"MindmapNode"> | string
    parentId?: StringNullableWithAggregatesFilter<"MindmapNode"> | string | null
    positionX?: FloatWithAggregatesFilter<"MindmapNode"> | number
    positionY?: FloatWithAggregatesFilter<"MindmapNode"> | number
    mindmapId?: StringWithAggregatesFilter<"MindmapNode"> | string
  }

  export type RequestWhereInput = {
    AND?: RequestWhereInput | RequestWhereInput[]
    OR?: RequestWhereInput[]
    NOT?: RequestWhereInput | RequestWhereInput[]
    id?: StringFilter<"Request"> | string
    type?: EnumRequestTypeFilter<"Request"> | $Enums.RequestType
    content?: StringFilter<"Request"> | string
    language?: StringNullableFilter<"Request"> | string | null
    maxLength?: IntNullableFilter<"Request"> | number | null
    minLength?: IntNullableFilter<"Request"> | number | null
    summary?: StringNullableFilter<"Request"> | string | null
    error?: StringNullableFilter<"Request"> | string | null
    status?: EnumRequestStatusFilter<"Request"> | $Enums.RequestStatus
    processingTime?: IntNullableFilter<"Request"> | number | null
    modelUsed?: StringNullableFilter<"Request"> | string | null
    createdAt?: DateTimeFilter<"Request"> | Date | string
    updatedAt?: DateTimeFilter<"Request"> | Date | string
  }

  export type RequestOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    language?: SortOrderInput | SortOrder
    maxLength?: SortOrderInput | SortOrder
    minLength?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    status?: SortOrder
    processingTime?: SortOrderInput | SortOrder
    modelUsed?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RequestWhereInput | RequestWhereInput[]
    OR?: RequestWhereInput[]
    NOT?: RequestWhereInput | RequestWhereInput[]
    type?: EnumRequestTypeFilter<"Request"> | $Enums.RequestType
    content?: StringFilter<"Request"> | string
    language?: StringNullableFilter<"Request"> | string | null
    maxLength?: IntNullableFilter<"Request"> | number | null
    minLength?: IntNullableFilter<"Request"> | number | null
    summary?: StringNullableFilter<"Request"> | string | null
    error?: StringNullableFilter<"Request"> | string | null
    status?: EnumRequestStatusFilter<"Request"> | $Enums.RequestStatus
    processingTime?: IntNullableFilter<"Request"> | number | null
    modelUsed?: StringNullableFilter<"Request"> | string | null
    createdAt?: DateTimeFilter<"Request"> | Date | string
    updatedAt?: DateTimeFilter<"Request"> | Date | string
  }, "id">

  export type RequestOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    language?: SortOrderInput | SortOrder
    maxLength?: SortOrderInput | SortOrder
    minLength?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    status?: SortOrder
    processingTime?: SortOrderInput | SortOrder
    modelUsed?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RequestCountOrderByAggregateInput
    _avg?: RequestAvgOrderByAggregateInput
    _max?: RequestMaxOrderByAggregateInput
    _min?: RequestMinOrderByAggregateInput
    _sum?: RequestSumOrderByAggregateInput
  }

  export type RequestScalarWhereWithAggregatesInput = {
    AND?: RequestScalarWhereWithAggregatesInput | RequestScalarWhereWithAggregatesInput[]
    OR?: RequestScalarWhereWithAggregatesInput[]
    NOT?: RequestScalarWhereWithAggregatesInput | RequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Request"> | string
    type?: EnumRequestTypeWithAggregatesFilter<"Request"> | $Enums.RequestType
    content?: StringWithAggregatesFilter<"Request"> | string
    language?: StringNullableWithAggregatesFilter<"Request"> | string | null
    maxLength?: IntNullableWithAggregatesFilter<"Request"> | number | null
    minLength?: IntNullableWithAggregatesFilter<"Request"> | number | null
    summary?: StringNullableWithAggregatesFilter<"Request"> | string | null
    error?: StringNullableWithAggregatesFilter<"Request"> | string | null
    status?: EnumRequestStatusWithAggregatesFilter<"Request"> | $Enums.RequestStatus
    processingTime?: IntNullableWithAggregatesFilter<"Request"> | number | null
    modelUsed?: StringNullableWithAggregatesFilter<"Request"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Request"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Request"> | Date | string
  }

  export type FlashcardWhereInput = {
    AND?: FlashcardWhereInput | FlashcardWhereInput[]
    OR?: FlashcardWhereInput[]
    NOT?: FlashcardWhereInput | FlashcardWhereInput[]
    id?: StringFilter<"Flashcard"> | string
    front?: StringFilter<"Flashcard"> | string
    back?: StringFilter<"Flashcard"> | string
    topic?: StringFilter<"Flashcard"> | string
    difficulty?: StringFilter<"Flashcard"> | string
    createdAt?: DateTimeFilter<"Flashcard"> | Date | string
    updatedAt?: DateTimeFilter<"Flashcard"> | Date | string
  }

  export type FlashcardOrderByWithRelationInput = {
    id?: SortOrder
    front?: SortOrder
    back?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlashcardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FlashcardWhereInput | FlashcardWhereInput[]
    OR?: FlashcardWhereInput[]
    NOT?: FlashcardWhereInput | FlashcardWhereInput[]
    front?: StringFilter<"Flashcard"> | string
    back?: StringFilter<"Flashcard"> | string
    topic?: StringFilter<"Flashcard"> | string
    difficulty?: StringFilter<"Flashcard"> | string
    createdAt?: DateTimeFilter<"Flashcard"> | Date | string
    updatedAt?: DateTimeFilter<"Flashcard"> | Date | string
  }, "id">

  export type FlashcardOrderByWithAggregationInput = {
    id?: SortOrder
    front?: SortOrder
    back?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FlashcardCountOrderByAggregateInput
    _max?: FlashcardMaxOrderByAggregateInput
    _min?: FlashcardMinOrderByAggregateInput
  }

  export type FlashcardScalarWhereWithAggregatesInput = {
    AND?: FlashcardScalarWhereWithAggregatesInput | FlashcardScalarWhereWithAggregatesInput[]
    OR?: FlashcardScalarWhereWithAggregatesInput[]
    NOT?: FlashcardScalarWhereWithAggregatesInput | FlashcardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Flashcard"> | string
    front?: StringWithAggregatesFilter<"Flashcard"> | string
    back?: StringWithAggregatesFilter<"Flashcard"> | string
    topic?: StringWithAggregatesFilter<"Flashcard"> | string
    difficulty?: StringWithAggregatesFilter<"Flashcard"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Flashcard"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Flashcard"> | Date | string
  }

  export type MindmapCreateInput = {
    id?: string
    title: string
    topic: string
    difficulty: string
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: MindmapNodeCreateNestedManyWithoutMindmapInput
  }

  export type MindmapUncheckedCreateInput = {
    id?: string
    title: string
    topic: string
    difficulty: string
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: MindmapNodeUncheckedCreateNestedManyWithoutMindmapInput
  }

  export type MindmapUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: MindmapNodeUpdateManyWithoutMindmapNestedInput
  }

  export type MindmapUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: MindmapNodeUncheckedUpdateManyWithoutMindmapNestedInput
  }

  export type MindmapCreateManyInput = {
    id?: string
    title: string
    topic: string
    difficulty: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MindmapUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MindmapUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MindmapNodeCreateInput = {
    id?: string
    title: string
    content: string
    parentId?: string | null
    positionX: number
    positionY: number
    mindmap: MindmapCreateNestedOneWithoutNodesInput
  }

  export type MindmapNodeUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    parentId?: string | null
    positionX: number
    positionY: number
    mindmapId: string
  }

  export type MindmapNodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionX?: FloatFieldUpdateOperationsInput | number
    positionY?: FloatFieldUpdateOperationsInput | number
    mindmap?: MindmapUpdateOneRequiredWithoutNodesNestedInput
  }

  export type MindmapNodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionX?: FloatFieldUpdateOperationsInput | number
    positionY?: FloatFieldUpdateOperationsInput | number
    mindmapId?: StringFieldUpdateOperationsInput | string
  }

  export type MindmapNodeCreateManyInput = {
    id?: string
    title: string
    content: string
    parentId?: string | null
    positionX: number
    positionY: number
    mindmapId: string
  }

  export type MindmapNodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionX?: FloatFieldUpdateOperationsInput | number
    positionY?: FloatFieldUpdateOperationsInput | number
  }

  export type MindmapNodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionX?: FloatFieldUpdateOperationsInput | number
    positionY?: FloatFieldUpdateOperationsInput | number
    mindmapId?: StringFieldUpdateOperationsInput | string
  }

  export type RequestCreateInput = {
    id?: string
    type: $Enums.RequestType
    content: string
    language?: string | null
    maxLength?: number | null
    minLength?: number | null
    summary?: string | null
    error?: string | null
    status?: $Enums.RequestStatus
    processingTime?: number | null
    modelUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RequestUncheckedCreateInput = {
    id?: string
    type: $Enums.RequestType
    content: string
    language?: string | null
    maxLength?: number | null
    minLength?: number | null
    summary?: string | null
    error?: string | null
    status?: $Enums.RequestStatus
    processingTime?: number | null
    modelUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    content?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    content?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestCreateManyInput = {
    id?: string
    type: $Enums.RequestType
    content: string
    language?: string | null
    maxLength?: number | null
    minLength?: number | null
    summary?: string | null
    error?: string | null
    status?: $Enums.RequestStatus
    processingTime?: number | null
    modelUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    content?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    content?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlashcardCreateInput = {
    id?: string
    front: string
    back: string
    topic: string
    difficulty: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlashcardUncheckedCreateInput = {
    id?: string
    front: string
    back: string
    topic: string
    difficulty: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlashcardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlashcardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlashcardCreateManyInput = {
    id?: string
    front: string
    back: string
    topic: string
    difficulty: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlashcardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlashcardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MindmapNodeListRelationFilter = {
    every?: MindmapNodeWhereInput
    some?: MindmapNodeWhereInput
    none?: MindmapNodeWhereInput
  }

  export type MindmapNodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MindmapCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MindmapMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MindmapMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type MindmapScalarRelationFilter = {
    is?: MindmapWhereInput
    isNot?: MindmapWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MindmapNodeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    parentId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    mindmapId?: SortOrder
  }

  export type MindmapNodeAvgOrderByAggregateInput = {
    positionX?: SortOrder
    positionY?: SortOrder
  }

  export type MindmapNodeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    parentId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    mindmapId?: SortOrder
  }

  export type MindmapNodeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    parentId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    mindmapId?: SortOrder
  }

  export type MindmapNodeSumOrderByAggregateInput = {
    positionX?: SortOrder
    positionY?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumRequestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestType | EnumRequestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestTypeFilter<$PrismaModel> | $Enums.RequestType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type RequestCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    language?: SortOrder
    maxLength?: SortOrder
    minLength?: SortOrder
    summary?: SortOrder
    error?: SortOrder
    status?: SortOrder
    processingTime?: SortOrder
    modelUsed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RequestAvgOrderByAggregateInput = {
    maxLength?: SortOrder
    minLength?: SortOrder
    processingTime?: SortOrder
  }

  export type RequestMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    language?: SortOrder
    maxLength?: SortOrder
    minLength?: SortOrder
    summary?: SortOrder
    error?: SortOrder
    status?: SortOrder
    processingTime?: SortOrder
    modelUsed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RequestMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    language?: SortOrder
    maxLength?: SortOrder
    minLength?: SortOrder
    summary?: SortOrder
    error?: SortOrder
    status?: SortOrder
    processingTime?: SortOrder
    modelUsed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RequestSumOrderByAggregateInput = {
    maxLength?: SortOrder
    minLength?: SortOrder
    processingTime?: SortOrder
  }

  export type EnumRequestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestType | EnumRequestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestTypeWithAggregatesFilter<$PrismaModel> | $Enums.RequestType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestTypeFilter<$PrismaModel>
    _max?: NestedEnumRequestTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type FlashcardCountOrderByAggregateInput = {
    id?: SortOrder
    front?: SortOrder
    back?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlashcardMaxOrderByAggregateInput = {
    id?: SortOrder
    front?: SortOrder
    back?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlashcardMinOrderByAggregateInput = {
    id?: SortOrder
    front?: SortOrder
    back?: SortOrder
    topic?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MindmapNodeCreateNestedManyWithoutMindmapInput = {
    create?: XOR<MindmapNodeCreateWithoutMindmapInput, MindmapNodeUncheckedCreateWithoutMindmapInput> | MindmapNodeCreateWithoutMindmapInput[] | MindmapNodeUncheckedCreateWithoutMindmapInput[]
    connectOrCreate?: MindmapNodeCreateOrConnectWithoutMindmapInput | MindmapNodeCreateOrConnectWithoutMindmapInput[]
    createMany?: MindmapNodeCreateManyMindmapInputEnvelope
    connect?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
  }

  export type MindmapNodeUncheckedCreateNestedManyWithoutMindmapInput = {
    create?: XOR<MindmapNodeCreateWithoutMindmapInput, MindmapNodeUncheckedCreateWithoutMindmapInput> | MindmapNodeCreateWithoutMindmapInput[] | MindmapNodeUncheckedCreateWithoutMindmapInput[]
    connectOrCreate?: MindmapNodeCreateOrConnectWithoutMindmapInput | MindmapNodeCreateOrConnectWithoutMindmapInput[]
    createMany?: MindmapNodeCreateManyMindmapInputEnvelope
    connect?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MindmapNodeUpdateManyWithoutMindmapNestedInput = {
    create?: XOR<MindmapNodeCreateWithoutMindmapInput, MindmapNodeUncheckedCreateWithoutMindmapInput> | MindmapNodeCreateWithoutMindmapInput[] | MindmapNodeUncheckedCreateWithoutMindmapInput[]
    connectOrCreate?: MindmapNodeCreateOrConnectWithoutMindmapInput | MindmapNodeCreateOrConnectWithoutMindmapInput[]
    upsert?: MindmapNodeUpsertWithWhereUniqueWithoutMindmapInput | MindmapNodeUpsertWithWhereUniqueWithoutMindmapInput[]
    createMany?: MindmapNodeCreateManyMindmapInputEnvelope
    set?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
    disconnect?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
    delete?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
    connect?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
    update?: MindmapNodeUpdateWithWhereUniqueWithoutMindmapInput | MindmapNodeUpdateWithWhereUniqueWithoutMindmapInput[]
    updateMany?: MindmapNodeUpdateManyWithWhereWithoutMindmapInput | MindmapNodeUpdateManyWithWhereWithoutMindmapInput[]
    deleteMany?: MindmapNodeScalarWhereInput | MindmapNodeScalarWhereInput[]
  }

  export type MindmapNodeUncheckedUpdateManyWithoutMindmapNestedInput = {
    create?: XOR<MindmapNodeCreateWithoutMindmapInput, MindmapNodeUncheckedCreateWithoutMindmapInput> | MindmapNodeCreateWithoutMindmapInput[] | MindmapNodeUncheckedCreateWithoutMindmapInput[]
    connectOrCreate?: MindmapNodeCreateOrConnectWithoutMindmapInput | MindmapNodeCreateOrConnectWithoutMindmapInput[]
    upsert?: MindmapNodeUpsertWithWhereUniqueWithoutMindmapInput | MindmapNodeUpsertWithWhereUniqueWithoutMindmapInput[]
    createMany?: MindmapNodeCreateManyMindmapInputEnvelope
    set?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
    disconnect?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
    delete?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
    connect?: MindmapNodeWhereUniqueInput | MindmapNodeWhereUniqueInput[]
    update?: MindmapNodeUpdateWithWhereUniqueWithoutMindmapInput | MindmapNodeUpdateWithWhereUniqueWithoutMindmapInput[]
    updateMany?: MindmapNodeUpdateManyWithWhereWithoutMindmapInput | MindmapNodeUpdateManyWithWhereWithoutMindmapInput[]
    deleteMany?: MindmapNodeScalarWhereInput | MindmapNodeScalarWhereInput[]
  }

  export type MindmapCreateNestedOneWithoutNodesInput = {
    create?: XOR<MindmapCreateWithoutNodesInput, MindmapUncheckedCreateWithoutNodesInput>
    connectOrCreate?: MindmapCreateOrConnectWithoutNodesInput
    connect?: MindmapWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MindmapUpdateOneRequiredWithoutNodesNestedInput = {
    create?: XOR<MindmapCreateWithoutNodesInput, MindmapUncheckedCreateWithoutNodesInput>
    connectOrCreate?: MindmapCreateOrConnectWithoutNodesInput
    upsert?: MindmapUpsertWithoutNodesInput
    connect?: MindmapWhereUniqueInput
    update?: XOR<XOR<MindmapUpdateToOneWithWhereWithoutNodesInput, MindmapUpdateWithoutNodesInput>, MindmapUncheckedUpdateWithoutNodesInput>
  }

  export type EnumRequestTypeFieldUpdateOperationsInput = {
    set?: $Enums.RequestType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumRequestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestType | EnumRequestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestTypeFilter<$PrismaModel> | $Enums.RequestType
  }

  export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type NestedEnumRequestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestType | EnumRequestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestTypeWithAggregatesFilter<$PrismaModel> | $Enums.RequestType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestTypeFilter<$PrismaModel>
    _max?: NestedEnumRequestTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type MindmapNodeCreateWithoutMindmapInput = {
    id?: string
    title: string
    content: string
    parentId?: string | null
    positionX: number
    positionY: number
  }

  export type MindmapNodeUncheckedCreateWithoutMindmapInput = {
    id?: string
    title: string
    content: string
    parentId?: string | null
    positionX: number
    positionY: number
  }

  export type MindmapNodeCreateOrConnectWithoutMindmapInput = {
    where: MindmapNodeWhereUniqueInput
    create: XOR<MindmapNodeCreateWithoutMindmapInput, MindmapNodeUncheckedCreateWithoutMindmapInput>
  }

  export type MindmapNodeCreateManyMindmapInputEnvelope = {
    data: MindmapNodeCreateManyMindmapInput | MindmapNodeCreateManyMindmapInput[]
    skipDuplicates?: boolean
  }

  export type MindmapNodeUpsertWithWhereUniqueWithoutMindmapInput = {
    where: MindmapNodeWhereUniqueInput
    update: XOR<MindmapNodeUpdateWithoutMindmapInput, MindmapNodeUncheckedUpdateWithoutMindmapInput>
    create: XOR<MindmapNodeCreateWithoutMindmapInput, MindmapNodeUncheckedCreateWithoutMindmapInput>
  }

  export type MindmapNodeUpdateWithWhereUniqueWithoutMindmapInput = {
    where: MindmapNodeWhereUniqueInput
    data: XOR<MindmapNodeUpdateWithoutMindmapInput, MindmapNodeUncheckedUpdateWithoutMindmapInput>
  }

  export type MindmapNodeUpdateManyWithWhereWithoutMindmapInput = {
    where: MindmapNodeScalarWhereInput
    data: XOR<MindmapNodeUpdateManyMutationInput, MindmapNodeUncheckedUpdateManyWithoutMindmapInput>
  }

  export type MindmapNodeScalarWhereInput = {
    AND?: MindmapNodeScalarWhereInput | MindmapNodeScalarWhereInput[]
    OR?: MindmapNodeScalarWhereInput[]
    NOT?: MindmapNodeScalarWhereInput | MindmapNodeScalarWhereInput[]
    id?: StringFilter<"MindmapNode"> | string
    title?: StringFilter<"MindmapNode"> | string
    content?: StringFilter<"MindmapNode"> | string
    parentId?: StringNullableFilter<"MindmapNode"> | string | null
    positionX?: FloatFilter<"MindmapNode"> | number
    positionY?: FloatFilter<"MindmapNode"> | number
    mindmapId?: StringFilter<"MindmapNode"> | string
  }

  export type MindmapCreateWithoutNodesInput = {
    id?: string
    title: string
    topic: string
    difficulty: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MindmapUncheckedCreateWithoutNodesInput = {
    id?: string
    title: string
    topic: string
    difficulty: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MindmapCreateOrConnectWithoutNodesInput = {
    where: MindmapWhereUniqueInput
    create: XOR<MindmapCreateWithoutNodesInput, MindmapUncheckedCreateWithoutNodesInput>
  }

  export type MindmapUpsertWithoutNodesInput = {
    update: XOR<MindmapUpdateWithoutNodesInput, MindmapUncheckedUpdateWithoutNodesInput>
    create: XOR<MindmapCreateWithoutNodesInput, MindmapUncheckedCreateWithoutNodesInput>
    where?: MindmapWhereInput
  }

  export type MindmapUpdateToOneWithWhereWithoutNodesInput = {
    where?: MindmapWhereInput
    data: XOR<MindmapUpdateWithoutNodesInput, MindmapUncheckedUpdateWithoutNodesInput>
  }

  export type MindmapUpdateWithoutNodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MindmapUncheckedUpdateWithoutNodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MindmapNodeCreateManyMindmapInput = {
    id?: string
    title: string
    content: string
    parentId?: string | null
    positionX: number
    positionY: number
  }

  export type MindmapNodeUpdateWithoutMindmapInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionX?: FloatFieldUpdateOperationsInput | number
    positionY?: FloatFieldUpdateOperationsInput | number
  }

  export type MindmapNodeUncheckedUpdateWithoutMindmapInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionX?: FloatFieldUpdateOperationsInput | number
    positionY?: FloatFieldUpdateOperationsInput | number
  }

  export type MindmapNodeUncheckedUpdateManyWithoutMindmapInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionX?: FloatFieldUpdateOperationsInput | number
    positionY?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}