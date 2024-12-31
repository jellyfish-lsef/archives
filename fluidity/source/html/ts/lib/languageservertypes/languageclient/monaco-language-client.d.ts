import { IConnection, IConnectionProvider } from "./connection";
import type { BaseLanguageClient, LanguageClientOptions, MessageTransports } from "./vscode-languageclient/client";
export * from "./vscode-languageclient/client";


class BaseLanguageClient {
    private _id;
    private _name;
    private _clientOptions;
    private _state;
    private _onReady;
    private _onReadyCallbacks;
    private _onStop;
    private _connectionPromise;
    private _resolvedConnection;
    private _initializeResult;
    private _outputChannel;
    private _disposeOutputChannel;
    private _traceOutputChannel;
    private _capabilities;
    private _listeners;
    private _providers;
    private _diagnostics;
    private _syncedDocuments;
    private _fileEvents;
    private _fileEventDelayer;
    private _telemetryEmitter;
    private _stateChangeEmitter;
    private _trace;
    private _traceFormat;
    private _tracer;
    private _c2p;
    private _p2c;
    constructor(id: string, name: string, clientOptions: LanguageClientOptions);
    private get state();
    private set state(value);
    private getPublicState;
    get initializeResult(): InitializeResult | undefined;
    sendRequest<R, PR, E, RO>(type: ProtocolRequestType0<R, PR, E, RO>, token?: CancellationToken): Promise<R>;
    sendRequest<P, R, PR, E, RO>(type: ProtocolRequestType<P, R, PR, E, RO>, params: P, token?: CancellationToken): Promise<R>;
    sendRequest<R, E>(type: RequestType0<R, E>, token?: CancellationToken): Promise<R>;
    sendRequest<P, R, E>(type: RequestType<P, R, E>, params: P, token?: CancellationToken): Promise<R>;
    sendRequest<R>(method: string, token?: CancellationToken): Promise<R>;
    sendRequest<R>(method: string, param: any, token?: CancellationToken): Promise<R>;
    onRequest<R, PR, E, RO>(type: ProtocolRequestType0<R, PR, E, RO>, handler: RequestHandler0<R, E>): Disposable;
    onRequest<P, R, PR, E, RO>(type: ProtocolRequestType<P, R, PR, E, RO>, handler: RequestHandler<P, R, E>): Disposable;
    onRequest<R, E>(type: RequestType0<R, E>, handler: RequestHandler0<R, E>): Disposable;
    onRequest<P, R, E>(type: RequestType<P, R, E>, handler: RequestHandler<P, R, E>): Disposable;
    onRequest<R, E>(method: string, handler: GenericRequestHandler<R, E>): Disposable;
    sendNotification<RO>(type: ProtocolNotificationType0<RO>): void;
    sendNotification<P, RO>(type: ProtocolNotificationType<P, RO>, params?: P): void;
    sendNotification(type: NotificationType0): void;
    sendNotification<P>(type: NotificationType<P>, params?: P): void;
    sendNotification(method: string): void;
    sendNotification(method: string, params: any): void;
    onNotification<RO>(type: ProtocolNotificationType0<RO>, handler: NotificationHandler0): Disposable;
    onNotification<P, RO>(type: ProtocolNotificationType<P, RO>, handler: NotificationHandler<P>): Disposable;
    onNotification(type: NotificationType0, handler: NotificationHandler0): Disposable;
    onNotification<P>(type: NotificationType<P>, handler: NotificationHandler<P>): Disposable;
    onNotification(method: string, handler: GenericNotificationHandler): Disposable;
    onProgress<P>(type: ProgressType<P>, token: string | number, handler: NotificationHandler<P>): Disposable;
    sendProgress<P>(type: ProgressType<P>, token: string | number, value: P): void;
    get clientOptions(): LanguageClientOptions;
    get protocol2CodeConverter(): p2c.Converter;
    get code2ProtocolConverter(): c2p.Converter;
    get onTelemetry(): Event<any>;
    get onDidChangeState(): Event<StateChangeEvent>;
    get outputChannel(): OutputChannel;
    get traceOutputChannel(): OutputChannel;
    get diagnostics(): DiagnosticCollection | undefined;
    createDefaultErrorHandler(maxRestartCount?: number): ErrorHandler;
    set trace(value: Trace);
    private data2String;
    info(message: string, data?: any, showNotification?: boolean): void;
    warn(message: string, data?: any, showNotification?: boolean): void;
    error(message: string, data?: any, showNotification?: boolean): void;
    private showNotificationMessage;
    private logTrace;
    private logObjectTrace;
    needsStart(): boolean;
    needsStop(): boolean;
    onReady(): Promise<void>;
    private isConnectionActive;
    start(): Disposable;
    private resolveConnection;
    private initialize;
    private doInitialize;
    private _clientGetRootPath;
    stop(): Promise<void>;
    private cleanUp;
    private cleanUpChannel;
    private notifyFileEvent;
    private _didChangeTextDocumentFeature;
    private forceDocumentSync;
    private handleDiagnostics;
    private setDiagnostics;
    protected abstract getLocale(): string;
    protected abstract createMessageTransports(encoding: string): Promise<MessageTransports>;
    private createConnection;
    protected handleConnectionClosed(): void;
    private handleConnectionError;
    private hookConfigurationChanged;
    private refreshTrace;
    private hookFileEvents;
    private readonly _features;
    private readonly _dynamicFeatures;
    registerFeatures(features: (StaticFeature | DynamicFeature<any>)[]): void;
    registerFeature(feature: StaticFeature | DynamicFeature<any>): void;
    getFeature(request: typeof DidOpenTextDocumentNotification.method): DynamicFeature<TextDocumentRegistrationOptions> & NotificationFeature<(textDocument: TextDocument) => void>;
    getFeature(request: typeof DidChangeTextDocumentNotification.method): DynamicFeature<TextDocumentRegistrationOptions> & NotificationFeature<(textDocument: TextDocument) => void>;
    getFeature(request: typeof WillSaveTextDocumentNotification.method): DynamicFeature<TextDocumentRegistrationOptions> & NotificationFeature<(textDocument: TextDocument) => void>;
    getFeature(request: typeof WillSaveTextDocumentWaitUntilRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & NotificationFeature<(textDocument: TextDocument) => ProviderResult<VTextEdit[]>>;
    getFeature(request: typeof DidSaveTextDocumentNotification.method): DynamicFeature<TextDocumentRegistrationOptions> & NotificationFeature<(textDocument: TextDocument) => void>;
    getFeature(request: typeof DidCloseTextDocumentNotification.method): DynamicFeature<TextDocumentRegistrationOptions> & NotificationFeature<(textDocument: TextDocument) => void>;
    getFeature(request: typeof DidCreateFilesNotification.method): DynamicFeature<FileOperationRegistrationOptions> & {
        send: (event: FileCreateEvent) => Promise<void>;
    };
    getFeature(request: typeof DidRenameFilesNotification.method): DynamicFeature<FileOperationRegistrationOptions> & {
        send: (event: FileRenameEvent) => Promise<void>;
    };
    getFeature(request: typeof DidDeleteFilesNotification.method): DynamicFeature<FileOperationRegistrationOptions> & {
        send: (event: FileDeleteEvent) => Promise<void>;
    };
    getFeature(request: typeof WillCreateFilesRequest.method): DynamicFeature<FileOperationRegistrationOptions> & {
        send: (event: FileWillCreateEvent) => Promise<void>;
    };
    getFeature(request: typeof WillRenameFilesRequest.method): DynamicFeature<FileOperationRegistrationOptions> & {
        send: (event: FileWillRenameEvent) => Promise<void>;
    };
    getFeature(request: typeof WillDeleteFilesRequest.method): DynamicFeature<FileOperationRegistrationOptions> & {
        send: (event: FileWillDeleteEvent) => Promise<void>;
    };
    getFeature(request: typeof CompletionRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<CompletionItemProvider>;
    getFeature(request: typeof HoverRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<HoverProvider>;
    getFeature(request: typeof SignatureHelpRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<SignatureHelpProvider>;
    getFeature(request: typeof DefinitionRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<DefinitionProvider>;
    getFeature(request: typeof ReferencesRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<ReferenceProvider>;
    getFeature(request: typeof DocumentHighlightRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<DocumentHighlightProvider>;
    getFeature(request: typeof CodeActionRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<CodeActionProvider>;
    getFeature(request: typeof DocumentFormattingRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<DocumentFormattingEditProvider>;
    getFeature(request: typeof DocumentRangeFormattingRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<DocumentRangeFormattingEditProvider>;
    getFeature(request: typeof DocumentOnTypeFormattingRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<OnTypeFormattingEditProvider>;
    getFeature(request: typeof RenameRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<RenameProvider>;
    getFeature(request: typeof DocumentSymbolRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<DocumentSymbolProvider>;
    getFeature(request: typeof DocumentLinkRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<DocumentLinkProvider>;
    getFeature(request: typeof DocumentColorRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<DocumentColorProvider>;
    getFeature(request: typeof DeclarationRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<DeclarationProvider>;
    getFeature(request: typeof FoldingRangeRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<FoldingRangeProvider>;
    getFeature(request: typeof ImplementationRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<ImplementationProvider>;
    getFeature(request: typeof SelectionRangeRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<SelectionRangeProvider>;
    getFeature(request: typeof TypeDefinitionRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<TypeDefinitionProvider>;
    getFeature(request: typeof CallHierarchyPrepareRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<CallHierarchyProvider>;
    getFeature(request: typeof SemanticTokensRegistrationType.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<SemanticTokensProviders>;
    getFeature(request: typeof LinkedEditingRangeRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & TextDocumentProviderFeature<LinkedEditingRangeProvider>;
    getFeature(request: typeof WorkspaceSymbolRequest.method): DynamicFeature<TextDocumentRegistrationOptions> & WorkspaceProviderFeature<WorkspaceSymbolProvider>;
    protected registerBuiltinFeatures(): void;
    protected fillInitializeParams(params: InitializeParams): void;
    private computeClientCapabilities;
    private initializeFeatures;
    private handleRegistrationRequest;
    private handleUnregistrationRequest;
    private handleApplyWorkspaceEdit;
    handleFailedRequest<T>(type: MessageSignature, error: any, defaultValue: T): T;
    private static Canceled;
    private makeCancelError;
}
export declare class MonacoLanguageClient extends BaseLanguageClient {
    start()
    static bypassConversion: (result: any) => any;
    protected readonly connectionProvider: IConnectionProvider;
    constructor({ id, name, clientOptions, connectionProvider }: MonacoLanguageClient.Options);
    protected doCreateConnection(): Thenable<IConnection>;
    protected createMessageTransports(encoding: string): Promise<MessageTransports>;
    protected registerBuiltinFeatures(): void;
    registerProposedFeatures(): void;
    protected getLocale(): string;
}
export declare namespace MonacoLanguageClient {
    interface Options {
        name: string;
        id?: string;
        clientOptions: LanguageClientOptions;
        connectionProvider: IConnectionProvider;
    }
}
// # sourceMappingURL=monaco-language-client.d.ts.map