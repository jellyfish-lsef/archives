/* eslint-disable no-template-curly-in-string */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MessageBus from "../../messageBus.js";
/* global monaco */
export default function register() {
    return __awaiter(this, void 0, void 0, function* () {
        let instances = ["Accessory", "Accoutrement", "Actor", "AdvancedDragger", "AlignOrientation", "AlignPosition", "AngularVelocity", "Animation", "AnimationController", "AnimationRigData", "Animator", "ArcHandles", "Atmosphere", "Attachment", "Backpack", "BallSocketConstraint", "Beam", "BillboardGui", "BinaryStringValue", "BindableEvent", "BindableFunction", "BlockMesh", "BloomEffect", "BlurEffect", "BodyAngularVelocity", "BodyColors", "BodyForce", "BodyGyro", "BodyPosition", "BodyThrust", "BodyVelocity", "Bone", "BoolValue", "BoxHandleAdornment", "Breakpoint", "BrickColorValue", "CFrameValue", "Camera", "CanvasGroup", "ChannelSelectorSoundEffect", "CharacterMesh", "ChorusSoundEffect", "ClickDetector", "Clouds", "Color3Value", "ColorCorrectionEffect", "CompressorSoundEffect", "ConeHandleAdornment", "Configuration", "CornerWedgePart", "CurveAnimation", "CustomEvent", "CustomEventReceiver", "CylinderHandleAdornment", "CylinderMesh", "CylindricalConstraint", "DataStoreIncrementOptions", "DataStoreOptions", "DataStoreSetOptions", "DebuggerWatch", "Decal", "DepthOfFieldEffect", "Dialog", "DialogChoice", "DistortionSoundEffect", "DoubleConstrainedValue", "Dragger", "EchoSoundEffect", "EqualizerSoundEffect", "EulerRotationCurve", "Explosion", "FaceControls", "FileMesh", "Fire", "Flag", "FlagStand", "FlangeSoundEffect", "FloatCurve", "FloorWire", "Folder", "ForceField", "Frame", "FunctionalTest", "Glue", "GuiMain", "Handles", "Hat", "HiddenSurfaceRemovalAsset", "Highlight", "HingeConstraint", "Hint", "Hole", "HopperBin", "Humanoid", "HumanoidController", "HumanoidDescription", "ImageButton", "ImageHandleAdornment", "ImageLabel", "IntConstrainedValue", "IntValue", "Keyframe", "KeyframeMarker", "KeyframeSequence", "LineForce", "LineHandleAdornment", "LinearVelocity", "LocalScript", "LocalizationTable", "ManualGlue", "ManualWeld", "MarkerCurve", "MaterialVariant", "MeshPart", "Message", "Model", "ModuleScript", "Motor", "Motor6D", "MotorFeature", "NegateOperation", "NoCollisionConstraint", "NumberPose", "NumberValue", "ObjectValue", "Pants", "ParabolaAdornment", "Part", "PartOperation", "PartOperationAsset", "ParticleEmitter", "PathfindingLink", "PathfindingModifier", "PitchShiftSoundEffect", "Plane", "Player", "PluginAction", "PointLight", "Pose", "PrismaticConstraint", "ProximityPrompt", "RayValue", "ReflectionMetadata", "ReflectionMetadataCallbacks", "ReflectionMetadataClass", "ReflectionMetadataClasses", "ReflectionMetadataEnum", "ReflectionMetadataEnumItem", "ReflectionMetadataEnums", "ReflectionMetadataEvents", "ReflectionMetadataFunctions", "ReflectionMetadataMember", "ReflectionMetadataProperties", "ReflectionMetadataYieldFunctions", "RemoteEvent", "RemoteFunction", "RenderingTest", "ReverbSoundEffect", "RigidConstraint", "RocketPropulsion", "RodConstraint", "RopeConstraint", "Rotate", "RotateP", "RotateV", "RotationCurve", "ScreenGui", "Script", "ScrollingFrame", "Seat", "SelectionBox", "SelectionPartLasso", "SelectionPointLasso", "SelectionSphere", "Shirt", "ShirtGraphic", "SkateboardController", "SkateboardPlatform", "Skin", "Sky", "Smoke", "Snap", "Sound", "SoundGroup", "Sparkles", "SpawnLocation", "Speaker", "SpecialMesh", "SphereHandleAdornment", "SpotLight", "SpringConstraint", "StandalonePluginScripts", "StarterGear", "StringValue", "SunRaysEffect", "SurfaceAppearance", "SurfaceGui", "SurfaceLight", "SurfaceSelection", "Team", "TeleportOptions", "TerrainRegion", "TextBox", "TextButton", "TextChannel", "TextChatCommand", "TextChatMessageProperties", "TextLabel", "Texture", "Tool", "Torque", "TorsionSpringConstraint", "Trail", "TremoloSoundEffect", "TrussPart", "Tween", "UIAspectRatioConstraint", "UICorner", "UIGradient", "UIGridLayout", "UIListLayout", "UIPadding", "UIPageLayout", "UIScale", "UISizeConstraint", "UIStroke", "UITableLayout", "UITextSizeConstraint", "UnionOperation", "UniversalConstraint", "Vector3Curve", "Vector3Value", "VectorForce", "VehicleController", "VehicleSeat", "VelocityMotor", "VideoFrame", "ViewportFrame", "VoiceChannel", "WedgePart", "Weld", "WeldConstraint", "WorldModel", "WrapLayer", "WrapTarget"];
        let services = ["ABTestService", "AdService", "AnalyticsService", "AnimationClipProvider", "AnimationFromVideoCreatorService", "AnimationFromVideoCreatorStudioService", "AppUpdateService", "AssetCounterService", "AssetDeliveryProxy", "AssetImportService", "AssetManagerService", "AssetService", "AvatarEditorService", "AvatarImportService", "BadgeService", "CoreGui", "StarterGui", "BreakpointManager", "BrowserService", "BulkImportService", "CacheableContentProvider", "HSRDataContentProvider", "MeshContentProvider", "SolidModelContentProvider", "CalloutService", "ChangeHistoryService", "Chat", "ClusterPacketCache", "CollectionService", "CommandService", "ConfigureServerService", "ContentProvider", "ContextActionService", "ControllerService", "CookiesService", "CorePackages", "CoreScriptSyncService", "CrossDMScriptChangeListener", "DataModelPatchService", "DataStoreService", "Debris", "DebuggerConnectionManager", "DebuggerManager", "DebuggerUIService", "DraftsService", "DraggerService", "EventIngestService", "FlagStandService", "FlyweightService", "CSGDictionaryService", "NonReplicatedCSGDictionaryService", "FriendService", "GamePassService", "GamepadService", "Geometry", "GoogleAnalyticsConfiguration", "GroupService", "GuiService", "GuidRegistryService", "HapticService", "HeightmapImporterService", "Hopper", "HttpRbxApiService", "HttpService", "ILegacyStudioBridge", "LegacyStudioBridge", "IXPService", "IncrementalPatchBuilder", "InsertService", "InternalContainer", "JointsService", "KeyboardService", "KeyframeSequenceProvider", "LSPService", "LanguageService", "Lighting", "LocalStorageService", "AppStorageService", "UserStorageService", "LocalizationService", "LodDataService", "LogService", "LoginService", "LuaWebService", "LuauScriptAnalyzerService", "MarketplaceService", "MaterialService", "MemStorageService", "MemoryStoreService", "MessageBusService", "MessagingService", "MouseService", "NetworkClient", "NetworkServer", "NetworkSettings", "NotificationService", "Workspace", "PackageService", "PackageUIService", "PathfindingService", "PermissionsService", "PhysicsService", "PlayerEmulatorService", "Players", "PluginDebugService", "PluginGuiService", "PluginPolicyService", "PointsService", "PolicyService", "ProcessInstancePhysicsService", "ProximityPromptService", "PublishService", "RbxAnalyticsService", "RemoteDebuggerServer", "RenderSettings", "ReplicatedFirst", "ReplicatedScriptService", "ReplicatedStorage", "RobloxPluginGuiService", "RobloxReplicatedStorage", "RunService", "RuntimeScriptService", "ScriptChangeService", "ScriptCloneWatcher", "ScriptCloneWatcherHelper", "ScriptContext", "ScriptRegistrationService", "ScriptService", "Selection", "ServerScriptService", "ServerStorage", "SessionService", "SocialService", "SoundService", "SpawnerService", "StarterPack", "StarterPlayer", "Stats", "StopWatchReporter", "Studio", "StudioAssetService", "StudioData", "StudioDeviceEmulatorService", "StudioHighDpiService", "StudioPublishService", "StudioScriptDebugEventListener", "StudioService", "TaskScheduler", "Teams", "TeleportService", "TemporaryCageMeshProvider", "TemporaryScriptService", "TestService", "TextBoxService", "TextChatService", "TextService", "ThirdPartyUserService", "TimerService", "ToastNotificationService", "ToolboxService", "TouchInputService", "TracerService", "TweenService", "UGCValidationService", "UnvalidatedAssetService", "UserInputService", "UserService", "VRService", "VersionControlService", "VirtualInputManager", "VirtualUser", "VisibilityService", "Visit", "VoiceChatInternal", "VoiceChatService"];
        let enums = ["ABTestLoadingStatus", "AccessoryType", "ActionType", "ActuatorRelativeTo", "ActuatorType", "AdornCullingMode", "AlignType", "AlphaMode", "AnalyticsEconomyAction", "AnalyticsLogLevel", "AnalyticsProgressionStatus", "AnimationPriority", "AnimatorRetargetingMode", "AppShellActionType", "AppShellFeature", "AppUpdateStatus", "ApplyStrokeMode", "AspectType", "AssetFetchStatus", "AssetType", "AssetTypeVerification", "AutoIndentRule", "AutomaticSize", "AvatarAssetType", "AvatarContextMenuOption", "AvatarItemType", "AvatarPromptResult", "Axis", "BinType", "BodyPart", "BodyPartR15", "BorderMode", "BreakReason", "BreakpointRemoveReason", "BulkMoveMode", "BundleType", "Button", "ButtonStyle", "CageType", "CameraMode", "CameraPanMode", "CameraType", "CatalogCategoryFilter", "CatalogSortType", "CellBlock", "CellMaterial", "CellOrientation", "CenterDialogType", "ChatCallbackType", "ChatColor", "ChatMode", "ChatPrivacyMode", "ChatStyle", "ChatVersion", "ClientAnimatorThrottlingMode", "CollisionFidelity", "CommandPermission", "ComputerCameraMovementMode", "ComputerMovementMode", "ConnectionError", "ConnectionState", "ContextActionPriority", "ContextActionResult", "ControlMode", "CoreGuiType", "CreateOutfitFailure", "CreatorType", "CurrencyType", "CustomCameraMode", "DataStoreRequestType", "DebuggerEndReason", "DebuggerFrameType", "DebuggerPauseReason", "DebuggerStatus", "DevCameraOcclusionMode", "DevComputerCameraMovementMode", "DevComputerMovementMode", "DevTouchCameraMovementMode", "DevTouchMovementMode", "DeveloperMemoryTag", "DeviceType", "DialogBehaviorType", "DialogPurpose", "DialogTone", "DominantAxis", "DraftStatusCode", "DraggerCoordinateSpace", "DraggerMovementMode", "EasingDirection", "EasingStyle", "ElasticBehavior", "EnviromentalPhysicsThrottle", "ExplosionType", "FieldOfViewMode", "FillDirection", "FilterResult", "Font", "FontSize", "FontStyle", "FontWeight", "FormFactor", "FrameStyle", "FramerateManagerMode", "FriendRequestEvent", "FriendStatus", "FunctionalTestResult", "GameAvatarType", "GearGenreSetting", "GearType", "Genre", "GraphicsMode", "HandlesStyle", "HighlightDepthMode", "HorizontalAlignment", "HoverAnimateSpeed", "HttpCachePolicy", "HttpContentType", "HttpError", "HttpRequestType", "HumanoidCollisionType", "HumanoidDisplayDistanceType", "HumanoidHealthDisplayType", "HumanoidOnlySetCollisionsOnStateChange", "HumanoidRigType", "HumanoidStateType", "IKCollisionsMode", "IXPLoadingStatus", "InOut", "InfoType", "InitialDockState", "InputType", "InterpolationThrottlingMode", "JointCreationMode", "KeyCode", "KeyInterpolationMode", "KeywordFilterType", "Language", "LeftRight", "LevelOfDetailSetting", "Limb", "LineJoinMode", "ListDisplayMode", "ListenerType", "LoadCharacterLayeredClothing", "Material", "MaterialPattern", "MembershipType", "MeshPartDetailLevel", "MeshPartHeadsAndAccessories", "MeshScaleUnit", "MeshType", "MessageType", "ModelLevelOfDetail", "ModifierKey", "MouseBehavior", "MoveState", "NameOcclusion", "NetworkOwnership", "NewAnimationRuntimeSetting", "NormalId", "OrientationAlignmentMode", "OutfitSource", "OutputLayoutMode", "OverrideMouseIconBehavior", "PackagePermission", "PacketPriority", "PartType", "ParticleEmitterShape", "ParticleEmitterShapeInOut", "ParticleEmitterShapeStyle", "ParticleFlipbookLayout", "ParticleFlipbookMode", "ParticleOrientation", "PathStatus", "PathWaypointAction", "PermissionLevelShown", "PhysicsSimulationRate", "PhysicsSteppingMethod", "Platform", "PlaybackState", "PlayerActions", "PlayerChatType", "PoseEasingDirection", "PoseEasingStyle", "PositionAlignmentMode", "PrivilegeType", "ProductLocationRestriction", "ProductPurchaseDecision", "ProximityPromptExclusivity", "ProximityPromptInputType", "ProximityPromptStyle", "QualityLevel", "R15CollisionType", "RaycastFilterType", "RenderFidelity", "RenderPriority", "RenderingTestComparisonMethod", "ReplicateInstanceDestroySetting", "ResamplerMode", "ReturnKeyType", "ReverbType", "RibbonTool", "RigType", "RollOffMode", "RotationOrder", "RotationType", "RuntimeUndoBehavior", "SaveFilter", "SavedQualitySetting", "ScaleType", "ScreenOrientation", "ScrollBarInset", "ScrollingDirection", "ServerAudioBehavior", "SignalBehavior", "SizeConstraint", "SortDirection", "SortOrder", "SoundType", "SpecialKey", "StartCorner", "Status", "StreamOutBehavior", "StreamingPauseMode", "StudioCloseMode", "StudioDataModelType", "StudioScriptEditorColorCategories", "StudioScriptEditorColorPresets", "StudioStyleGuideColor", "StudioStyleGuideModifier", "Style", "SurfaceConstraint", "SurfaceGuiSizingMode", "SurfaceType", "SwipeDirection", "TableMajorAxis", "Technology", "TeleportMethod", "TeleportResult", "TeleportState", "TeleportType", "TerrainAcquisitionMethod", "TextChatMessageStatus", "TextFilterContext", "TextInputType", "TextTruncate", "TextXAlignment", "TextYAlignment", "TextureMode", "TextureQueryType", "ThreadPoolConfig", "ThrottlingPriority", "ThumbnailSize", "ThumbnailType", "TickCountSampleMethod", "TopBottom", "TouchCameraMovementMode", "TouchMovementMode", "TriStateBoolean", "TweenStatus", "UITheme", "UiMessageType", "UserCFrame", "UserInputState", "UserInputType", "VRTouchpad", "VRTouchpadMode", "VelocityConstraintMode", "VerticalAlignment", "VerticalScrollBarPosition", "VibrationMotor", "VirtualCursorMode", "VirtualInputMode", "VoiceChatState", "WaterDirection", "WaterForce", "WrapLayerDebugMode", "WrapTargetDebugMode", "ZIndexBehavior"];
        try {
            instances = [];
            services = [];
            enums = [];
            let f = yield fetch("https://raw.githubusercontent.com/CloneTrooper1019/Roblox-Client-Tracker/roblox/API-Dump.json");
            let json = yield f.json();
            for (let element of json.Classes) {
                if (element.Tags && element.Tags.includes("Service")) {
                    services.push(element.Name);
                }
                else if (!element.Tags || !element.Tags.includes("NotCreatable")) {
                    instances.push(element.Name);
                    instances.sort();
                }
            }
            for (let element of json.Enums) {
                enums.push(element.Name);
            }
            console.log("[Editor] Instances:", instances.length, "Services:", services.length, "Enums:", enums.length);
        }
        catch (e) {
            MessageBus.emit("toast", {
                title: "Could not update editor features",
                description: e.toString(),
                color: "error",
                closable: true
            });
        }
        monaco.languages.registerCompletionItemProvider("lua", {
            provideCompletionItems: function () {
                return {
                    suggestions: [
                        // Keywords:
                        {
                            label: "global",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Variable",
                            documentation: "Declares a variable accessible throughout the entire script, but not cross-script. Prefer `local` and forward declarations / upvalues over using global variables for a 10%+ increase in performance. `global` itself is not a valid keyword. Variables can't start with a number and can't be reserved by Lua.",
                            preselect: true,
                            insertText: "${1:name} = ${2:value}",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "local",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Variable",
                            documentation: "Declares a scoped variable that only exists in the main executing body (with additions to descendant scope levels), or only in the block where it is declared. Omit the `local` in front of the variable to make the variable visible to all scopes. `local`s are faster than global variables by 10%+. Variables can't start with a number and can't be reserved by Lua.",
                            preselect: true,
                            insertText: "local ${1:name} = ${2:value}",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "nil",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Keyword",
                            documentation: "The absence of any value. `nil` itself is a representation of the fact that there is no value. You can also assign a variable to it which in turn destroys the variable. Use the Destroy() method on instances instead of assigning its parent to `nil`.",
                            preselect: true,
                            insertText: "nil"
                        },
                        {
                            label: "true",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Boolean",
                            documentation: "Boolean type true, often used in parameters or operations. When using conditional operators (i.e. == or ~=), everything except `false` and `nil` is considered 'truthy'.",
                            preselect: true,
                            insertText: "true"
                        },
                        {
                            label: "false",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Boolean",
                            documentation: "Boolean type false, often used in parameters or operations. When using conditional operators (i.e. == or ~=), only `false` and `nil` is considered 'falsy', everything else is 'truthy'.",
                            preselect: true,
                            insertText: "false"
                        },
                        {
                            label: "and",
                            kind: monaco.languages.CompletionItemKind.Operator,
                            detail: "Operator",
                            documentation: "The operator and returns its first argument if it is false; otherwise, it returns its second argument.",
                            preselect: true,
                            insertText: "and"
                        },
                        {
                            label: "or",
                            kind: monaco.languages.CompletionItemKind.Operator,
                            detail: "Operator",
                            documentation: "If the first argument is neither `false` nor `nil`, the first value is returned. If the first argument is `false` or `nil`, it returns the second value. Sometimes used in variable declarations as a fallback.",
                            preselect: true,
                            insertText: "or"
                        },
                        {
                            label: "not",
                            kind: monaco.languages.CompletionItemKind.Operator,
                            detail: "Operator",
                            documentation: "Returns `true` if the argument is `false` or `nil`, otherwise, `false` is returned.",
                            preselect: true,
                            insertText: "not"
                        },
                        {
                            label: "function",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Function",
                            documentation: "Functions are code that can be used multiple times throughout a script. After defining them, you can execute them through a command or trigger them with an event. You can call the function by doing `name(argument1, argument2)`. Excess arguments will be ignored, and lacking arguments will become `nil`.",
                            preselect: true,
                            insertText: "function ${1:name}(${2:parameters})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "function()",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Function (anonymous)",
                            documentation: "A self-executing function without a name (an 'anonymous' function). Useful when you need to call a function from the result of another function or event or a connection.",
                            preselect: true,
                            insertText: "function(${1:parameters})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "return",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Function",
                            documentation: "Inside of a function, you can return data to the calling statement. Useful in arguments.",
                            preselect: true,
                            insertText: "return ${1:variable}",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "if",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Keyword",
                            documentation: "Runs the code inside of `then` and `end`, but only if the arguments you passed evaluate to true.",
                            preselect: true,
                            insertText: "if ${1:condition} then\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "then",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Keyword",
                            documentation: "Suffix for `if` and `elseif`.",
                            insertText: "then\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "elseif",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Keyword",
                            documentation: "If no previous `if` or `elseif` conditions except this one evaluates to true, this will run.",
                            preselect: true,
                            insertText: "elseif ${1:condition} then\n\t$0",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "else",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Keyword",
                            documentation: "Provides a fallback for `if` and `elseif`, which is what to do when all of the evaluated conditions are falsy (nil, false).",
                            preselect: true,
                            insertText: "else\n\t$0",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "for",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Loop",
                            documentation: "Run a command or group of commands (code) a set number of times. Beginning at the start value, the loop will count up by the increment variable until it reaches the end variable. The increment variable can be negative.",
                            filterText: "for ",
                            preselect: true,
                            insertText: "for i = ${1:1}, ${2:10}, ${3:1} do\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "for ... in ?",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Loop",
                            documentation: "A snippet for iterator function usage with a `for` loop.",
                            filterText: "for ... in ",
                            preselect: true,
                            insertText: "for ${1:returns} in ${2:iterator} do\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "while",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Loop",
                            documentation: "Runs the code inside of the loop if, when, and while the arguments evaluate to true. If the arguments evaluate to true, the loop is executed and the condition is reevaluated afterward. Includes a `wait()` to prevent the game from freezing up from overload.",
                            filterText: "while ",
                            preselect: true,
                            insertText: "while ${1:condition} do\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "do",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Loop",
                            documentation: "Suffix for `for` and `while` loops. This can be used without a loop to alter the scope of variables.",
                            insertText: "do\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "repeat",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Loop",
                            documentation: "Unlike `while`, this loop repeats until a condition is met. The code between `repeat` and `until` runs at least once since the condition is reevaluated afterward.",
                            preselect: true,
                            insertText: "repeat\n\t$0\nuntil ${1:condition}",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "until",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Loop",
                            documentation: "Suffix for `repeat`, the arguments are what is to be evaluated before executing the loop's code again.",
                            preselect: true,
                            insertText: "until ${1:condition}",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "break",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            detail: "Loop",
                            documentation: "Immediately breaks out of the current loop.",
                            preselect: true,
                            insertText: "break\n",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Lua Globals:
                        {
                            label: "assert",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Throws an error if the provided value is `false` or `nil`. If the assertion passes, it returns all values passed to it.",
                            insertText: "assert(${1:value}, ${2:message})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "collectgarbage",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Performs a count operation on the Lua garbage collector, which returns the total Lua memory usage in kilobytes.",
                            insertText: "collectgarbage(\"count\")",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "dofile",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Opens the named file and executes its contents as a Lua chunk. ",
                            insertText: "dofile(${1:filename})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "error",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Terminates the last protected function called and outputs message as an error message. If the function containing the error is not called in a protected function (pcall), then the script which called the function will terminate. The error function itself never returns and acts like a script error.",
                            insertText: "error(${1:message}, ${2:level})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "gcinfo",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Returns the current amount of memory used by Lua in kilobytes.",
                            insertText: "gcinfo()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "getfenv",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Returns the current environment in use by the caller.",
                            insertText: "getfenv($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "getmetatable",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Returns the metatable of the given table if it has one, otherwise returns nil. If it does have a metatable, and the `__metatable` metamethod is set, it returns that value instead.",
                            insertText: "getmetatable($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "loadfile",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Compiles the contents of a provided file as a Lua chunk. The chunk can then be executed by calling the function returned by loadfile.",
                            insertText: "loadfile(${1:filename})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "loadstring",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Compiles the contents of a provided string as a Lua chunk. The chunk can then be executed by calling the function returned by loadstring.",
                            insertText: "loadstring(${1:string})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "next",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Returns the first key/value pair in the array. If a lastKey argument was specified then returns the next element in the array based on the key that provided.",
                            insertText: "next(${1:table}, ${2:lastKey})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "pcall",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Calls the function with the given arguments, but if the function raises an error, it catches it and returns an error message as the second return value. The first return value describes whether the function call succeeded (`true`) or not (`false`).",
                            insertText: "local success, message = pcall($0, ${1:arguments})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "print",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Receives any number of arguments, and prints their values to the output. Uses `__tostring` instead of `tostring()`.",
                            preselect: true,
                            insertText: "print($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "rawequal",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Checks whether arg1 is equal to arg2, without invoking any metamethod.",
                            insertText: "rawequal(${1:arg1}, ${2:arg2})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "rawget",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Gets the real value of table[index], without invoking any metamethod.",
                            insertText: "rawget(${1:table}, ${2:index})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "rawset",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Sets the real value of table[index] to a given value, without invoking any metamethod.",
                            insertText: "rawset(${1:table}, ${2:index}, ${3:value})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "select",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Returns all arguments after argument number index. If negative, it will return from the end of the argument list. If the first argument is '#', it returns the total number of arguments passed afterward.",
                            insertText: "select(${1:index}, ${2:args})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "setfenv",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Sets the environment to be used by the given function. The first argument can be a function or a number that specifies the function at that stack level. **Do not call the function**.",
                            insertText: "setfenv(${1:block}, ${2:fenv})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "setmetatable",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Sets the metatable for the given table to `metatable`. If `metatable` is nil, the metatable of t is removed. If t already has a metatable whose __metatable metamethod is set, calling this on t raises an error.",
                            insertText: "setmetatable(${1:table}, ${2:metatable})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "tonumber",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Attempts to convert the arg into a number with a specified base (the optional second argument) to interpret the value in. If it cannot be converted, this function returns nil. Base is automatically 10 unless the number begins with '0x', which makes the base 16.",
                            insertText: "tonumber($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "tostring",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Receives an argument of any type and converts it to a string in a reasonable format. If the metatable of the first argument has a `__tostring` metamethod, then it will be called with that as the only argument and will return the result.",
                            insertText: "tostring($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "type",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Returns the type of its only argument, coded as a string. Deprecated in favor of `typeof`, which only exists in Roblox Lua. Use `type` if you don't want to include Roblox Datatypes or are using vanilla Lua. This is also 30% faster than `typeof`.",
                            tags: [monaco.languages.CompletionItemTag.Deprecated],
                            insertText: "typeof($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "unpack",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Returns the elements from the given table. By default, start is 1 and end is the length of list, as defined by the length (#) operator. `table.unpack` has the same behavior.",
                            insertText: "unpack(${1:list}, ${2:start}, ${3:finish})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "xpcall",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "This function is similar to `pcall`, except that you can set a new error handler (as a function).",
                            insertText: "local success, message = xpcall($2, ${0:handler}, ${1:arguments})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "ypcall",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "This function is the exact same as `pcall`, and was used to allow yielding inside of a `pcall`. That functionality is now implemented in the normal `pcall`, and as such, this function is deprecated.",
                            tags: [monaco.languages.CompletionItemTag.Deprecated],
                            insertText: "local success, message = pcall($0, ${1:arguments})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "newproxy(true)",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Creates a blank userdata, with the option for it to have a metatable.",
                            insertText: "newproxy(true)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "ipairs",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Returns three values: an iterator function, the array and the number 0. Each time the iterator function is called, it returns the next numerical index-value pair in the table. When used in a generic for-loop, the return values can be used to iterate over each numerical index in the table.",
                            insertText: "ipairs($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "pairs",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Lua Global",
                            documentation: "Returns an iterator function, the passed table and nil, so that the construction will iterate over all key/value pairs of that table when used in a generic for-loop.",
                            insertText: "pairs($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "_G",
                            kind: monaco.languages.CompletionItemKind.Variable,
                            detail: "Lua Global",
                            documentation: "A table that is shared between all scripts of the same context level (a table shared cross-script). This is separate from `shared`.",
                            insertText: "_G.$0",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "_VERSION",
                            kind: monaco.languages.CompletionItemKind.Variable,
                            detail: "Lua Global",
                            documentation: "A global variable (not a function) that holds a string containing the current interpreter version.",
                            insertText: "_VERSION"
                        },
                        // Roblox Globals:
                        {
                            label: "delay",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Schedules a function to be executed after `time` seconds have passed, without yielding the current thread. The minimum delay time is 29ms+ and is also the default duration for `time`.",
                            insertText: "delay(${1:time}, $0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "elapsedTime",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Returns how much time has elapsed since the current instance of Roblox was started.",
                            insertText: "elapsedTime()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "printidentity",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Prints the current thread's security context level with the defined prefix in the first argument.",
                            insertText: "printidentity($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "require",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Runs the supplied ModuleScript if it has not been run already, and returns what the ModuleScript returned (in both cases). You can use the rbxassetid (as an integer) of the ModuleScript on server scripts.",
                            insertText: "require($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "settings",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Returns the `GlobalSettings` object, which can be used to access the settings objects that are used in Roblox Studio's settings menu.",
                            insertText: "settings()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "spawn",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Runs the specified callback function in a separate thread, without yielding the current thread. Since the function will be executed the next time Roblox's Task Scheduler runs an update cycle, this is deprecated in favor of `coroutine.wrap()()`.",
                            tags: [monaco.languages.CompletionItemTag.Deprecated],
                            insertText: "coroutine.wrap($0)()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "stats",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Returns the Stats service. Deprecated in favor of\n```lua\ngame:GetService(\"Stats\")\n```",
                            tags: [monaco.languages.CompletionItemTag.Deprecated],
                            insertText: "game:GetService(\"Stats\")",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "tick",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Returns the elapsed time (in seconds) since the Unix Epoch (1 January 1970) on the local session's computer. `os.time()` always returns Unix time and should be used instead. `os.clock()` is also a better function for benchmarking purposes.",
                            insertText: "tick()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "time",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Returns the amount of time, in seconds, that has elapsed since the current game instance started running. If the current game instance is not running, this will be 0.",
                            insertText: "time()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "typeof",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Returns the type of the object specified, as a string, including Roblox Datatypes. `type()` is much faster and therefore should be used instead when you do not need to also parse Roblox Datatypes.",
                            insertText: "typeof($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "UserSettings",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Returns the UserSettings object, which is used to read information from the current user's game menu settings.",
                            insertText: "UserSettings()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "version",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Returns the current version of Roblox as a string. The integers in the version string are separated by periods, and representing `Generation`.`Version`.`Patch`.`Commit`.",
                            insertText: "version()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "wait",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Yields the current thread until the specified amount of seconds have elapsed. Minimum duration is 29ms+. Very unreliable.",
                            insertText: "wait($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "warn",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Roblox Global",
                            documentation: "Behaves identically to Lua's print function, except the output is styled as a warning, with yellow text and a timestamp.",
                            insertText: "warn($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Enum",
                            kind: monaco.languages.CompletionItemKind.Variable,
                            detail: "Roblox Global",
                            documentation: "A reference to the Enums datatype, which stores all of the available enums that can be used on Roblox.",
                            insertText: "Enum.${1|" + enums.join(",") + "|}.",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "game",
                            kind: monaco.languages.CompletionItemKind.Variable,
                            detail: "Roblox Global",
                            documentation: "A reference to the DataModel, which is the root Instance of Roblox's parent/child hierarchy.",
                            preselect: true,
                            insertText: "game",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "shared",
                            kind: monaco.languages.CompletionItemKind.Variable,
                            detail: "Roblox Global",
                            documentation: "A table that is shared across all scripts that share the same execution context level (a table shared cross-script). This is separate from `_G`.",
                            insertText: "shared",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "script",
                            kind: monaco.languages.CompletionItemKind.Variable,
                            detail: "Roblox Global",
                            documentation: "A reference to the script object that is executing the code you are writing (The current Script, LocalScript, ModuleScript, or CoreScript).",
                            preselect: true,
                            insertText: "script",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "workspace",
                            kind: monaco.languages.CompletionItemKind.Variable,
                            detail: "Roblox Global",
                            documentation: "A reference to the Workspace service, which contains all of the physical components of a Roblox world. You can also use `game.Workspace` or `game:GetService(\"Workspace\")` to access the workspace.",
                            preselect: true,
                            insertText: "workspace",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Roblox DataTypes
                        // Axes
                        {
                            label: "Axes.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new Axes using list of axes and/or faces. NormalIds (faces) are converted to the corresponding axes.",
                            insertText: "Axes.new($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // BrickColor
                        {
                            label: "BrickColor.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Constructs a BrickColor using its numerical index, or RGB / Color3 match.",
                            insertText: "BrickColor.new($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "BrickColor.new (named)",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Constructs a BrickColor using its name.",
                            insertText: "BrickColor.new(\"${1|Alder,Artichoke,Baby blue,Beige,Black,Black metallic,Br. reddish orange,Br. yellowish green,Br. yellowish orange,Brick yellow,Bright blue,Bright bluish green,Bright bluish violet,Bright green,Bright orange,Bright purple,Bright red,Bright reddish lilac,Bright reddish violet,Bright violet,Bright yellow,Bronze,Brown,Burgundy,Burlap,Burnt Sienna,Buttermilk,CGA brown,Cadet blue,Camo,Carnation pink,Cashmere,Cloudy grey,Cocoa,Cool yellow,Copper,Cork,Crimson,Curry,Cyan,Daisy orange,Dark Curry,Dark Royal blue,Dark blue,Dark green,Dark grey,Dark grey metallic,Dark indigo,Dark nougat,Dark orange,Dark red,Dark stone grey,Dark taupe,Deep blue,Deep orange,Deep orange,Dirt brown,Dove blue,Dusty Rose,Earth blue,Earth green,Earth orange,Earth yellow,Eggplant,Electric blue,Faded green,Fawn brown,Fire Yellow,Flame reddish orange,Flame yellowish orange,Flint,Fog,Forest green,Fossil,Ghost grey,Gold,Gold,Grey,Grime,Gun metallic,Hot pink,Hurricane grey,Institutional white,Khaki,Lapis,Laurel green,Lavender,Lemon metalic,Lig. Yellowich orange,Lig. yellowish green,Light Royal blue,Light blue,Light bluish green,Light bluish violet,Light brick yellow,Light green (Mint),Light grey,Light grey metallic,Light lilac,Light orange,Light orange brown,Light pink,Light purple,Light red,Light reddish violet,Light stone grey,Light yellow,Lilac,Lilac,Lily white,Lime green,Linen,Magenta,Maroon,Mauve,Med. bluish green,Med. reddish violet,Med. yellowish green,Med. yellowish orange,Medium Royal blue,Medium blue,Medium bluish violet,Medium green,Medium lilac,Medium orange,Medium red,Medium stone grey,Mid gray,Mint,Moss,Mulberry,Navy blue,Neon green,Neon orange,New Yeller,Nougat,Olive,Olivine,Oyster,Parsley green,Pastel Blue,Pastel blue-green,Pastel brown,Pastel green,Pastel light blue,Pastel orange,Pastel violet,Pastel yellow,Pearl,Persimmon,Phosph. White,Pine Cone,Pink,Plum,Quill grey,Really black,Really blue,Really red,Red flip/flop,Reddish brown,Reddish lilac,Royal blue,Royal purple,Rust,Rust,Sage green,Salmon,Sand blue,Sand blue metallic,Sand green,Sand red,Sand violet,Sand violet metallic,Sand yellow,Sand yellow metallic,Sea green,Seashell,Shamrock,Silver,Silver flip/flop,Slime green,Smoky grey,Steel blue,Storm blue,Sunrise,Tawny,Teal,Terra Cotta,Toothpaste,Tr. Blue,Tr. Bright bluish violet,Tr. Brown,Tr. Flu. Blue,Tr. Flu. Green,Tr. Flu. Red,Tr. Flu. Reddish orange,Tr. Flu. Yellow,Tr. Green,Tr. Lg blue,Tr. Medi. reddish violet,Tr. Red,Tr. Yellow,Transparent,Turquoise,Warm yellowish orange,Wheat,White,Yellow flip/flop|}\")",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "BrickColor.pallete",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Constructs a BrickColor from its palette index.",
                            insertText: "BrickColor.pallete(${0:pallete})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "BrickColor.random",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Constructs a random BrickColor.",
                            insertText: "BrickColor.random()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // CatalogSearchParams
                        {
                            label: "CatalogSearchParams.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Makes a new CatalogSearchParams object which specifies the parameters of a catalog search.",
                            insertText: [
                                "local ${1:name} = CatalogSearchParams.new()",
                                "${1:name}.SearchKeyword = \"$2\"",
                                "${1:name}.MinPrice = ${3:0}",
                                "${1:name}.MaxPrice = ${4:2^32 - 1}",
                                "${1:name}.SortType = Enum.CatalogSortType.${5|Relevance,PriceHighToLow,PriceLowToHigh,RecentlyUpdated,MostFavorited|}",
                                "${1:name}.CategoryFilter = Enum.CatalogFilter.${6|None,Featured,Collectibles,CommunityCreations,Premium,Recommended|}",
                                "${1:name}.BundleType = {$7}",
                                "${1:name}.AssetTypes = {$8}",
                                ""
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // CFrame
                        {
                            label: "CFrame.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a CFrame based on nothing, a Vector3, or (x, y, z) coordinates and an optional quaternion and/or orientation matrix.",
                            insertText: "CFrame.new($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "CFrame.lookAt",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Constructs a CFrame located at the given `position`, and facing towards `look`. The upward `direction` can optionally be specified, which is `0, 1, 0` by default.",
                            insertText: "CFrame.lookAt(${1:position}, ${2:look}, ${3:direction})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "CFrame.fromEulerAnglesXYZ",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a rotated CFrame using angles (`rx`, `ry`, `rz`) in radians. Applied in Z, Y, X order.",
                            insertText: "CFrame.fromEulerAnglesXYZ(${1:rx}, ${2:ry}, ${3:rz})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "CFrame.fromEulerAnglesYXZ",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a rotated CFrame using angles (`rx`, `ry`, `rz`) in radians. Applied in Y, X, Z order.",
                            insertText: "CFrame.fromEulerAnglesYXZ(${1:rx}, ${2:ry}, ${3:rz})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "CFrame.Angles",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Equivalent to `CFrame.fromEulerAnglesXYZ`, autofills this.",
                            insertText: "CFrame.fromEulerAnglesXYZ(${1:rx}, ${2:ry}, ${3:rz})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "CFrame.fromOrientation",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Equivalent to `CFrame.fromEulerAnglesYXZ`, autofills this.",
                            insertText: "CFrame.fromEulerAnglesYXZ(${1:rx}, ${2:ry}, ${3:rz})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "CFrame.fromAxisAngle",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a rotated CFrame from a Unit Vector3 and a rotation in radians.",
                            insertText: "CFrame.fromEulerAnglesYXZ(${1:vector}, ${2:rotation})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "CFrame.fromMatrix",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a CFrame from a translation and the columns of a rotation matrix.\nWhen `vz` is excluded, the third column is calculated as `[vx:Cross(vy).Unit]`.",
                            insertText: "CFrame.fromEulerAnglesYXZ(${1:position}, ${2:x}, ${3:y}, ${4:z})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "CFrame.Orthonormalize",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Returns an orthonormalized copy of the CFrame.",
                            insertText: "CFrame.Orthonormalize()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Color3
                        {
                            label: "Color3.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Returns a Color3 with the given red, green, and blue values on the range [0, 1]. When no arguments are given, this function creates a Color3 whose values are (0, 0, 0) (black).",
                            insertText: "Color3.new(${1:r}, ${2:g}, ${3:b})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Color3.fromRGB",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Acts the same as `Color3.new`, but the RGB components are instead on the range [0, 255].",
                            insertText: "Color3.fromRGB(${1:r}, ${2:g}, ${3:b})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Color3.fromHSV",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a Color3 with the given hue, saturation, and value, on the range [0, 1].",
                            insertText: "Color3.fromHSV(${1:h}, ${2:s}, ${3:v})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // ColorSequence
                        {
                            label: "ColorSequence.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a sequence of two keypoints with either `Color1` (Color3) being the starting and end value, or with `Color2` (Color3) being the end value, or an array of [ColorSequenceKeypoints](https://developer.roblox.com/en-us/api-reference/datatype/ColorSequenceKeypoint) for more keypoints.",
                            insertText: "ColorSequence.new($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "ColorSequenceKeypoint.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a keypoint with a specified time and color.",
                            insertText: "Color3.fromHSV(${1:point}, ${2:color})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // DateTime
                        {
                            label: "DateTime.now",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new DateTime representing the current moment in time.",
                            insertText: "DateTime.now()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "DateTime.fromUnixTimestamp",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new DateTime object from the given [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time), the number of **seconds** since January 1, 1970.",
                            insertText: "DateTime.fromUnixTimestamp(${1:seconds})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "DateTime.fromUnixTimestampMillis",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new DateTime object from the given [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time), the number of **milliseconds** since January 1, 1970.",
                            insertText: "DateTime.fromUnixTimestampMillis(${1:milliseconds})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "DateTime.fromUniversalTime",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new DateTime using the given units from a UTC time. The values accepted are similar to those found in the time value table returned by `DateTime.ToUniversalTime`.",
                            insertText: "DateTime.fromUniversalTime(${1:year}, ${2:month}, ${3:day}, ${4:hour}, ${5:minute}, ${6:second}, ${7:millisecond})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "DateTime.fromLocalTime",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new DateTime using the given units from a local time. The values accepted are similar to those found in the time value table returned by `DateTime.ToLocalTime`.",
                            insertText: "DateTime.fromLocalTime(${1:year}, ${2:month}, ${3:day}, ${4:hour}, ${5:minute}, ${6:second}, ${7:millisecond})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "DateTime.fromIsoDate",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a DateTime from an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time string in UTC time, such as those returned by `DateTime.ToIsoDate`. If the string parsing fails, the function returns `nil`.\n\nAn example ISO 8601 date-time string would be `2020-01-02T10:30:45Z`, which represents January nd 2020 at 10:30 AM, 45 seconds.",
                            insertText: "DateTime.fromIsoDate($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // DockWidgetPluginGuiInfo
                        {
                            label: "DockWidgetPluginGuiInfo.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "The main constructor function for the `DockWidgetPluginGuiInfo`.",
                            insertText: "DockWidgetPluginGuiInfo.new(Enum.InitialDockState.${1|Top,Bottom,Left,Right,Float|}, ${2:enabled}, ${3:overrideEnabledRestore}, ${4:floatXSize}, ${5:floatYSize}, ${6:minWidth}, ${7:minHeight})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Faces
                        {
                            label: "Faces.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new Faces given some number of NormalId enumerators as arguments.",
                            insertText: "Faces.new(Enum.NormalId.${1|Top,Bottom,Back,Front,Right,Left|}${2:, ${3:...}})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Instance
                        {
                            label: "Instance.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates an new object of the given type.",
                            preselect: true,
                            insertText: "Instance.new(\"${1|" + instances.join(",") + "|}\")",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Instance.new",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "A fully-fledged template for instance creation, using performance benifits.",
                            insertText: "local ${1:instance} = Instance.new(\"${2|" + instances.join(",") + "|}\")\n$0\n${1:instance}.Parent = ${3:parent}",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Instance.new.Property",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Constructor",
                            documentation: "A shorthand version of the default instance constructor which uses the parent argument and sets the only needed property afterward. Often used for UILayout objects.",
                            insertText: "Instance.new(\"${1|" + instances.join(",") + "|}\", ${2:parent}).${3:property} = ${4:value}",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // NumberRange
                        {
                            label: "NumberRange.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new NumberRange with the provided minimum and maximum. `Minimum <= Maximum` must be true.",
                            insertText: "NumberRange.new(${1:min}, ${2:max})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // NumberSequence
                        {
                            label: "NumberSequence.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a sequence of two keypoints with a start and end value or a table with all the numbers with a `NumberSequenceKeypoint`.",
                            insertText: "NumberSequence.new(${1:start}, ${2:finish})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "NumberSequenceKeypoint.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a keypoint with a specified time, value, and envelope.",
                            insertText: "NumberSequenceKeypoint.new(${1:time}, ${2:value}, ${3:envelop})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // PathWaypoint
                        {
                            label: "PathWaypoint.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new PathWaypoint object.",
                            insertText: "PathWaypoint.new(${1:position}, Enum.PathWaypointAction.${2|Walk,Jump|})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // PhysicalProperties
                        {
                            label: "PhysicalProperties.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a PhysicalProperties container, with the specified density, friction, and elasticity, as well as the weight of the friction and elasticity.",
                            insertText: "PhysicalProperties.new(${1:density}, ${2:friction}, ${3:elasticity}, ${4:frictionWeight}, ${5:elasticityWeight})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "PhysicalProperties.new (material)",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a PhysicalProperties container, with the density, friction, and elasticity specified for this Material.",
                            insertText: "PhysicalProperties.new(Enum.Material.${1|" + ["Plastic", "Wood", "Slate", "Concrete", "CorrodedMetal", "DiamondPlate", "Foil", "Grass", "Ice", "Marble", "Granite", "Brick", "Pebble", "Sand", "Fabric", "SmoothPlastic", "Metal", "WoodPlanks", "Cobblestone", "Air", "Water", "Rock", "Glacier", "Snow", "Sandstone", "Mud", "Basalt", "Ground", "CrackedLava", "Neon", "Glass", "Asphalt", "LeafyGrass", "Salt", "Limestone", "Pavement", "ForceField"].sort().join(",") + "|})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Random
                        {
                            label: "Random.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new Random object. If the seed parameter is not specified, it will use a seed pulled from an internal entropy source.",
                            insertText: "Random.new(\"${1:seed}\")",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Ray
                        {
                            label: "Ray.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new Ray with given Origin and Direction.",
                            insertText: "Ray.new(${1:origin}, ${2:direction})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "RaycastParams.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a blank RaycastParams object. Unlike other datatype constructors, this constructor does not have any parameters, so you should set its properties appropriately.",
                            insertText: "RaycastParams.new()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Rect
                        {
                            label: "Rect.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Constructs a new Rect given two `Vector2`s: `min` as top left corner and `max` as bottom right corner.",
                            insertText: "Rect.new(${1:min}, ${2:max})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Region3
                        {
                            label: "Region3.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new Region3 given the `Vector3` bounds of a the rectangular prism volume.",
                            insertText: "Region3.new(${1:min}, ${2:max})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Region3int16.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new Region3int16 given its bounds as `Vector3int16`s.",
                            insertText: "Region3int16.new(${1:min}, ${2:max})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // TweenInfo
                        {
                            label: "TweenInfo.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new TweenInfo with the given parameters.",
                            insertText: "TweenInfo.new(${2:length}, Enum.EasingStyle.${3|Linear,Sine,Back,Quad,Quart,Quint,Bounce,Elastic,Exponential,Circular,Cubic|}, Enum.EasingDirection.${4|In,Out,InOut|}, ${5:repeats}, ${6:reverses}, 0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // UDim
                        {
                            label: "UDim.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a UDim from components.",
                            insertText: "UDim.new(${1:scale}, ${2:offset})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // UDim2
                        {
                            label: "UDim2.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Construct a new `UDim2` given the coordinates of the two UDim representing each axis.",
                            insertText: "UDim2.new(${1:xS}, ${2:xO}, ${3:yS}, ${4:yO})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "UDim2.fromScale",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Construct a new UDim2 using the given scalar coordinates.",
                            insertText: "UDim2.fromScale(${1:x}, ${2:y})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "UDim2.fromOffset",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Construct a new UDim2 using the given offset coordinates.",
                            insertText: "UDim2.fromOffset(${1:x}, ${2:y})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Vector2
                        {
                            label: "Vector2.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new Vector2 using ordinates `x` and `y`.",
                            insertText: "Vector2.new(${1:x}, ${2:y})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Vector2int16.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new Vector2int16 given the x and y components. Non-integer components are rounded down. Maximum values are -2^15, 2^15.",
                            insertText: "Vector2int16.new(${1:x}, ${2:y})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Vector3
                        {
                            label: "Vector3.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Constructs a new Vector3 using the given x, y, and z components.",
                            preselect: true,
                            insertText: "Vector3.new(${1:x}, ${2:y}, ${3:z})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Vector3.FromNormalId",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Constructs a new Vector3 in a particular direction.",
                            insertText: "Vector3.FromNormalId(Enum.NormalId.${1|Top,Bottom,Back,Front,Right,Left|}${2:, ${3:...}})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Vector3.FromAxis",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Constructs a new Vector3 for a particular axis.",
                            insertText: "Vector3.FromAxis(Enum.Axis.${1|X,Y,Z|})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Vector3int16.new",
                            kind: monaco.languages.CompletionItemKind.Constructor,
                            detail: "Constructor",
                            documentation: "Creates a new Vector3int16 given the x, y and z components. Non-integer components are rounded down. Maximum values are -2^15, 2^15.",
                            insertText: "Vector3int16.new(${1:x}, ${2:y}, ${3:z})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Roblox libraries
                        // bit32
                        {
                            label: "bit32",
                            kind: monaco.languages.CompletionItemKind.Module,
                            detail: "Library",
                            documentation: "This library is a back-ported feature from Lua 5.2 which provides functions to perform bitwise operations."
                        },
                        {
                            label: "bit32.arshift",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the number x shifted disp bits to the right. The number disp may be any representable integer. Negative displacements shift to the left.",
                            insertText: "bit32.arshift(${1:x}, ${2:disp})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.band",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the bitwise \"and\" of its operands.",
                            insertText: "bit32.band($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.bnot",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the bitwise negation of x.",
                            insertText: "bit32.bnot($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.bor",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the bitwise \"or\" of its operands.",
                            insertText: "bit32.bor($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.btest",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns a boolean signalling whether the bitwise \"and\" of its operands is different from zero.",
                            insertText: "bit32.btest($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.bxor",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the bitwise exclusive \"or\" of its operands.",
                            insertText: "bit32.bxor($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.extract",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the unsigned number formed by the bits `field` to `field + width - 1` from `number`. Bits are numbered from 0 (least significant) to 31 (most significant). All accessed bits must be in the range [0, 31]. The default for width is 1.",
                            insertText: "bit32.extract(${1:number}, ${2:field}, ${3:width})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.replace",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns a copy of `number` with the bits `field` to `field + width - 1` replaced by the value `v`. Bits are numbered from 0 (least significant) to 31 (most significant). All accessed bits must be in the range [0, 31]. The default for width is 1.",
                            insertText: "bit32.replace(${1:number}, ${2:field}, ${3:width})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.lrotate",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the number x rotated disp bits to the left. The number disp may be any representable integer.",
                            insertText: "bit32.lrotate(${1:x}, ${2:disp})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.lshift",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the number x shifted disp bits to the left. The number disp may be any representable integer. Negative displacements shift to the right.",
                            insertText: "bit32.lshift(${1:x}, ${2:disp})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.rrotate",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the number x rotated disp bits to the right. The number disp may be any representable integer.",
                            insertText: "bit32.rrotate(${1:x}, ${2:disp})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "bit32.rshift",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the number x shifted disp bits to the right. The number disp may be any representable integer. Negative displacements shift to the left.",
                            insertText: "bit32.rshift(${1:x}, ${2:disp})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Coroutine
                        {
                            label: "coroutine",
                            kind: monaco.languages.CompletionItemKind.Module,
                            detail: "Library",
                            documentation: "A coroutine is used to perform multiple tasks at the same time from within the same script. A task doesn't need to have a defined ending point, but it does need to define particular times at which it will yield (pause) to let other things be worked on."
                        },
                        {
                            label: "coroutine.create",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Creates a new coroutine, with a function.",
                            insertText: "coroutine.create($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "coroutine.resume",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Starts or continues the execution of the coroutine. The first time you resume a coroutine, it starts running its body. Additional arguments are passed as the arguments to the body function.",
                            insertText: "coroutine.resume(${1:coroutine}, $0})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "coroutine.running",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the running coroutine.",
                            insertText: "coroutine.running()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "coroutine.status",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the status of the coroutine, as a string: ‘running', if the coroutine is running (that is, it called status); ‘suspended', if the coroutine is suspended in a call to yield, or if it has not started running yet; ‘normal' if the coroutine is active but not running (that is, it has resumed another coroutine); and ‘dead' if the coroutine has finished its body function, or if it has stopped with an error.",
                            insertText: "coroutine.status($0})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "coroutine.wrap",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Creates a new coroutine, with a function. Returns a function that resumes the coroutine each time it is called. Any arguments passed to the function behave as the extra arguments to resume.",
                            insertText: "coroutine.wrap($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "coroutine.yield",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Suspends the execution of the calling coroutine. Any arguments to yield are passed as extra results to resume.",
                            insertText: "coroutine.yield($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // debug library
                        {
                            label: "debug",
                            kind: monaco.languages.CompletionItemKind.Module,
                            detail: "Library",
                            documentation: "This library provides a few basic functions for debugging code in Roblox."
                        },
                        {
                            label: "debug.traceback",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns a traceback of the current function call stack as a string (a description of the functions that have been called up to this point).",
                            insertText: "debug.traceback(${1:message}, ${2:level})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "debug.profilebegin",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Opens a microprofiler label.",
                            insertText: "debug.profilebegin($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "debug.profileend",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Closes the top microprofiler label.",
                            insertText: "debug.profileend()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // os
                        {
                            label: "math",
                            kind: monaco.languages.CompletionItemKind.Module,
                            detail: "Library",
                            documentation: "This library is an interface to the standard C math library, providing all of its functions inside the math table. When the documentation references `x` and arguments are not prefilled, assume it is the first or all argument(s)."
                        },
                        {
                            label: "math.abs",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the absolute value of x.",
                            insertText: "math.abs($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.acos",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the arc cosine of x.",
                            insertText: "math.acos($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.asin",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the arc sine of x.",
                            insertText: "math.asin($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.atan",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the arc tangent of x (in radians).",
                            insertText: "math.atan($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.atan2",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the arc tangent of y/x (in radians), but uses the signs of both parameters to find the quadrant of the result. It also handles correctly the case of x being zero.",
                            insertText: "math.(${1:x}, ${2:y})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.cell",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the smallest integer larger than or equal to x.",
                            insertText: "math.cell($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.clamp",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns a number between min and max, inclusive.",
                            insertText: "math.clamp(${1:x}, ${2:min}, ${3:max})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.cos",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the cosine of x (assumed to be in radians).",
                            insertText: "math.cos($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.cosh",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the hyperbolic cosine of x.",
                            insertText: "math.cosh($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.deg",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the angle x (given in radians) in degrees.",
                            insertText: "math.deg($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.exp",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the value e^x.",
                            insertText: "math.exp($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.floor",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the largest integer smaller than or equal to x.",
                            insertText: "math.floor($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.fmod",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the remainder of the division of x by y that rounds the quotient towards zero.",
                            insertText: "math.fmod(${1:x}, ${2:y})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.frexp",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns m and e such that x = m*2^e, e is an integer and the absolute value of m is in the range [0.5, 1) (or zero when x is zero).",
                            insertText: "math.frexp($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.ldexp",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns m*2^e (e should be an integer).",
                            insertText: "math.ldexp(${1:x}, ${2:e})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.log",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the logarithm of x using the given base, or the mathematical constant e if no base is provided (natural logarithm).",
                            insertText: "math.(${1:x}, ${2:base})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.log10",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the base-10 logarithm of x.",
                            insertText: "math.log10($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.max",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the maximum value among the numbers passed to the function.",
                            insertText: "math.max($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.min",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the minimum value among the numbers passed to the function.",
                            insertText: "math.min($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.modf",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns two numbers, the integral part of x and the fractional part of x.",
                            insertText: "math.modf($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.noise",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns a perlin noise value. The returned value is most often between the range [-1, 1]. The returned value is sometimes will be outside of the range [-1,1], so if the interval is critical to you, you should use math.clamp(noise, -1, 1) on the output. Unspecified arguments are interpreted as 0.",
                            insertText: "math.noise(${1:x}, ${2:y}, ${3:z})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.pow",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns x^y. You can also use the expression x^y to compute this value.",
                            insertText: "math.pow(${1:x}, ${2:y})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.rad",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the angle x (given in degrees) in radians.",
                            insertText: "math.rad($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.random",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "This function is an interface to the simple pseudo-random generator function rand provided by ANSI C. It returns a uniform pseudo-random integer in the range [min, max]",
                            insertText: "math.random(${1:min}, ${2:max})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.randomseed",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Sets x as the seed for the pseudo-random generator: equal seeds produce equal sequences of numbers.",
                            insertText: "math.randomseed($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.round",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the integer with the smallest difference between it and the given number. For example, the value 5.8 returns 6.For values like 0.5 that are equidistant to two integers, the value with the greater difference between it and zero is chosen.",
                            insertText: "math.round($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.sign",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns -1 if x < 0, 0 if x == 0, or 1 if x > 0.",
                            insertText: "math.sign($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.sin",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the sine of x (assumed to be in radians).",
                            insertText: "math.sin($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.sinh",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the hyperbolic sine of x.",
                            insertText: "math.sinh($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.sqrt",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the square root of x. You can also use the expression x^0.5 to compute this value.",
                            insertText: "math.sqrt($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.tan",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the tangent of x (assumed to be in radians).",
                            insertText: "math.tan($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.tanh",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the hyperbolic tangent of x.",
                            insertText: "math.tanh($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.huge",
                            kind: monaco.languages.CompletionItemKind.Constant,
                            detail: "Constant",
                            documentation: "The value HUGE_VAL, a value larger than or equal to any other numerical value.",
                            insertText: "math.huge",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.pi",
                            kind: monaco.languages.CompletionItemKind.Constant,
                            detail: "Constant",
                            documentation: "The approximate value of π.",
                            insertText: "math.pi",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // os
                        {
                            label: "os",
                            kind: monaco.languages.CompletionItemKind.Module,
                            detail: "Library",
                            documentation: "This library currently serves the purpose of providing information about the system time under the UTC format."
                        },
                        {
                            label: "os.time",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns how many seconds have passed since the Unix epoch (1 January 1970, 00:00:00), under current UTC time.",
                            insertText: "os.time($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "os.difftime",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the number of seconds from time2 to time1.",
                            insertText: "os.difftime(${1:time1}, ${2:time2})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "os.date",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Formats the given formatString with date/time information based on the given time, or if not provided, the value returned by os.time. Specifiers are inherited from C's \"strftime\"",
                            insertText: "os.date(${1:formatString}, ${2:time})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "os.clock",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the amount of CPU time used by Lua in seconds. This value has high precision, about 1 microsecond.",
                            insertText: "os.clock()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // string
                        {
                            label: "string",
                            kind: monaco.languages.CompletionItemKind.Module,
                            detail: "Library",
                            documentation: "This library provides generic functions for string manipulation such as finding and extracting substrings, pattern matching, and more. It provides all of its functions inside the global `string` variable."
                        },
                        {
                            label: "string.byte",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the internal numerical codes of the characters text[start], text[start + 1], …, text[finish].",
                            insertText: "string.byte(${1:text}, ${2:start}, ${3:finish})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.char",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Receives zero or more integers. Returns a string with length equal to the number of arguments, in which each character has the internal numerical code equal to its corresponding argument.",
                            insertText: "string.char($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.find",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Looks for the first match of pattern in the string `text`. If it finds a match, then find returns the indices of s where this occurrence starts and ends; otherwise, it returns nil. `init` specifies where to start the search (defaults to 1), and `plain` turns off the pattern matching facilities if `true`.",
                            insertText: "string.find(${1:text}, ${2:pattern}, ${3:init}, ${4:plain})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.format",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns a formatted version of its variable number of arguments following the description given in its first argument (which must be a string).",
                            insertText: "string.format($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.gmatch",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns an iterator function that, each time it is called, returns the next captures from pattern over the string `text`.",
                            insertText: "string.gmatch(${1:text}, ${2:pattern})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.gsub",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Short for global substitution. Returns a copy of string in which all (or the first n, if given) occurrences of the pattern are substituted (replaced) with the given replacement. The second value returned is the total number of substitutions made. An optional final argument can be provided which specifies the maximum number of substitutions to make.",
                            insertText: "string.gsub(${1:text}, ${2:pattern}, ${3:replacement}, ${4:replacements})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.len",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Receives a string and returns its length.",
                            insertText: "string.len($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.lower",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Receives a string and returns a copy of this string with all uppercase letters changed to lowercase.",
                            insertText: "string.lower($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.match",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Looks for the first match of pattern in the string `text`. If a match is found, it is returned; otherwise, it returns nil. A third, optional numerical argument init specifies where to start the search; its default value is 1 and can be negative.",
                            insertText: "string.match(${1:text}, ${2:pattern}, ${3:init})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.rep",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns a string that is the concatenation of `copies` copies of the string `text`.",
                            insertText: "string.rep(${1:text}, ${2:copies})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.reverse",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns a string that is the string reversed",
                            insertText: "string.reverse($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.split",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Splits a string into parts based on the defined separator character(s), returning a table of ordered results. If an empty “slice” is located, that part will be returned as an empty string. By default, the separator character is `,`.",
                            insertText: "string.split(${1:text}, ${2:separator})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.sub",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the substring of `text` that starts at `start` and continues until `end`; `start and `end` can be negative. If `end` is absent, then it is assumed to be equal to -1 (which is the same as the string length).\n\nExample: `string.sub(\"Hello\", 2, 4)` --> ell",
                            insertText: "string.sub(${1:text}, ${2:start}, ${3:finish})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "string.upper",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Receives a string and returns a copy of this string with all lowercase letters changed to uppercase. All other characters are left unchanged.",
                            insertText: "string.upper($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // table
                        {
                            label: "table",
                            kind: monaco.languages.CompletionItemKind.Module,
                            detail: "Library",
                            documentation: "This library provides generic functions for table/array manipulation, providing all its functions inside the global `table` variable."
                        },
                        {
                            label: "table.concat",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Given an array where all elements are strings or numbers, returns the string array[start] … separator … array[start + 1] … separator … array[finish]. The default value for separator is an empty string, the default for `start` is 1, and the default for `end` is `#array`. If `start` is greater than `end`, returns the empty string.",
                            insertText: "table.concat(${1:array}, ${2:separator}, ${3:start}, ${4:finish})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.foreach",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Iterates over the provided table, passing the key and value of each iteration over to the provided function.",
                            insertText: "table.foeach(${1:dictionary}, $0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.foreachi",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "This is similar to `table.foreach()` except that index-value pairs are passed, not key-value pairs.",
                            insertText: "table.foreachi(${1:array}, $0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.getn",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the number of elements in the table passed.",
                            insertText: "table.getn($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.insert",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Appends the provided value to the end of array `array`. The optional `position` value defaults to `#array + 1`, meaning that value is inserted at the end of array `array` unless otherwise specified.",
                            insertText: "table.insert(${1:array}, ${2:position}, ${3:value})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.remove",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Removes from array `array` the element at position `position`, returning the value of the removed element. When `position` is an integer between 1 and #array, it shifts down the elements and erases element array[#array].",
                            insertText: "table.remove(${1:array}, ${2:position})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.sort",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Sorts elements of array `array` in a given order, from array[1] to array[#array]. If a function is given, then it must receive two elements and returns true when the first element must come before the second in the final order (so that not function(array[i + 1], array[i]) will be true after the sort). If a function is not given, then the standard Lua operator < is used instead.",
                            insertText: "table.sort(${1:array}, ${0})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.pack",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns a new table with all arguments stored into keys 1, 2, etc. and with a field “n” with the total number of arguments. The resulting table may not be a sequence.",
                            insertText: "table.pack($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.unpack",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the elements from the given list. By default, `start` is 1 and `finish` is `#list`.",
                            insertText: "table.unpack(${1:list}, ${2:start}, ${3:finish})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.move",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Moves elements from table `from` to table `to`, performing the equivalent to the following multiple assignment: to[index], ... = from[start], ..., from[finish]. In easier terms, move index `start` through `finish` in `from` to index `index` in `to`.",
                            insertText: "table.move(${1:from}, ${2:start}, ${3:finish}, ${4:index}, ${5:to})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.create",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Creates a table with the array portion allocated to the given number of elements, optionally filled with the given value.",
                            insertText: "table.create(${1:count}, ${2:value})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.clear",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Sets the value for all keys within the given table to nil. This causes the # operator to return 0 for the given table. This function does not delete/destroy the table provided to it. This function is meant to be used specifically for tables that are to be re-used.",
                            insertText: "table.clear($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.find",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Within the given array-like table `array`, find the first occurrence of value `value`, starting from index `init` or the beginning if not provided. If the value is not found, `nil` is returned.",
                            insertText: "table.find(${1:array}, ${2:value}, ${3:init})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // utf8
                        {
                            label: "utf8",
                            kind: monaco.languages.CompletionItemKind.Module,
                            detail: "Library",
                            documentation: "This library provides basic support for UTF-8 encoding. This library does not provide any support for Unicode other than the handling of the encoding."
                        },
                        {
                            label: "utf8.char",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Receives zero or more codepoints as integers, converts each one to its corresponding UTF-8 byte sequence and returns a string with the concatenation of all these sequences.",
                            insertText: "utf8.char($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "utf8.codes",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns an iterator function that will iterate over all codepoints in the provided string.",
                            insertText: "utf8.codes($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "utf8.codepoint",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the codepoints (as integers) from all codepoints in the provided string (`text`) that start between byte positions `start` and `finish` (both included).",
                            insertText: "utf8.codepoint(${1:text}, ${2:start}, ${3:finish})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "utf8.len",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the number of UTF-8 codepoints in the string `text` that start between positions `start` and `finish` (both inclusive).",
                            insertText: "utf8.len(${1:text}, ${2:start}, ${3:finish})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "utf8.offset",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns the position (in bytes) where the encoding of the `codepoint`-th codepoint of `text` (counting from byte position `start`) starts.",
                            insertText: "utf8.offset(${1:text}, ${2:codepoint}, ${3:start})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "utf8.graphemes",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Returns an iterator function that will iterate the grapheme clusters of the string.",
                            insertText: "utf8.graphemes($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "utf8.nfcnormalize",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Converts the input string to Normal Form C, which tries to convert decomposed characters into composed characters.",
                            insertText: "utf8.nfcnomralize($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "utf8.nfdnormalize",
                            kind: monaco.languages.CompletionItemKind.Function,
                            detail: "Function",
                            documentation: "Converts the input string to Normal Form D, which tries to break up composed characters into decomposed characters.",
                            insertText: "utf8.nfdnormalize($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "utf8.charpattern",
                            kind: monaco.languages.CompletionItemKind.Constant,
                            detail: "Constant",
                            documentation: "The pattern \"[%z\\x01-\\x7F\\xC2-\\xF4][\\x80-\\xBF]*\", which matches exactly zero or more UTF-8 byte sequence, assuming that the subject is a valid UTF-8 string.",
                            insertText: "utf8.charpattern",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Metatables
                        {
                            label: "__index",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "Fires when table[index] is indexed, if table[index] is nil. Can also be set to a table, in which case that table will be indexed.",
                            insertText: "__index = function(${1:self}, ${2:index})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__newindex",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "Fires when table[index] tries to be set (table[index] = value), if table[index] is nil. Can also be set to a table, in which case that table will be indexed.",
                            insertText: "__newindex = function(${1:self}, ${2:index}, ${3:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__call",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "Fires when the table is called like a function, ... is the arguments that were passed.",
                            insertText: "__call  = function(${1:self}, ${2:...})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__concat",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "Fires when the .. concatenation operator is used on the table.",
                            insertText: "__concat = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__unm",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "Fires when the unary – operator is used on the table.",
                            insertText: "__unm = function(${1:self})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__add",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "The + addition operator.",
                            insertText: "__add = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__sub",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "The - subtraction operator.",
                            insertText: "__sub = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__mul",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "The * multiplication operator.",
                            insertText: "__mul = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__div",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "The / division operator.",
                            insertText: "__div = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__mod",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "The % modulus operator.",
                            insertText: "__mod = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__pow",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "The ^ exponentiation operator.",
                            insertText: "__pow = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__eq",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "The == equal to operator.",
                            insertText: "__eq = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__lt",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "The < less than operator\n\nUsing the >= greater than or equal to operator will invoke this metamethod and return the opposite of what this returns, as greater than or equal to is the same as not less than.",
                            insertText: "__lt = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__le",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "The <= operator\n\nUsing the > greater than operator will invoke this metamethod and return the opposite of what this returns, as greater than is the same as not less than or equal to.",
                            insertText: "__le = function(${1:self}, ${2:value})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__len",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "Fired when the # length operator is used on the Object.\n\nOnly userdatas actually respect the __len() metamethod in Lua 5.1.",
                            insertText: "__len = function(${1:self})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__tostring",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "Fired when tostring is called on the table.",
                            insertText: "__tostring = function(${1:self})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__metatable",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "If present, locks the metatable so `getmetatable` will return this instead of the metatable and `setmetatable` will error. Non-function value.",
                            insertText: "__metatable = \"${1:The metatable is locked}\"",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__mode",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "Used in weak tables, declaring whether the keys and/or values of a table are weak.\n\nReferences to Roblox instances are never weak. Tables that hold such references will never be garbage collected.",
                            insertText: "__mode",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "__gc",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Metamethod",
                            documentation: "Fired when the table is garbage-collected.\n\nOn Roblox, this metamethod is disabled.",
                            tags: [monaco.languages.CompletionItemTag.Deprecated],
                            insertText: "__gc = function(${1:self})\n\t$0\nend",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Service Provider
                        {
                            label: "FindService",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the service specified by the given class name if it's already created. Errors for an invalid name.",
                            filterText: "game:FindService",
                            insertText: "game:FindService(\"${1|" + services.join(",") + "|}\")",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetService",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the service with the requested class name, creating it if it does not exist.",
                            filterText: "game:GetService",
                            insertText: "game:GetService(\"${1|" + services.join(",") + "|}\")",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Helper snippets
                        {
                            label: "function(...)",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Function (Variadic)",
                            documentation: "A varaiadic function is a function that allows you to use infinite arguments inside of a function, like `print()`. After packing the `...` token, you can iterate through it with an array's `for` loop.",
                            preselect: true,
                            insertText: [
                                "local function ${1:name}(${2:parameters}, ...)",
                                "\tlocal arguments = table.pack(...)",
                                "\t$0",
                                "end"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "for i, v in ipairs()",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Loop",
                            documentation: "This is a commonly used variation of the `for` loop which iterates through an array with the `ipairs` iterator. `i` means index, and `v` means value.",
                            filterText: "for i, v in ipairs",
                            preselect: true,
                            insertText: [
                                "for i, v in ipairs(${1:array}) do",
                                "\t$0",
                                "end"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "for k, v in pairs()",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Loop",
                            documentation: "This is a commonly used variation of the `for` loop which iterates through a dictionary with the `pairs` iterator. `k` means key, and `v` means value. The loop may not return items in the same way they're declared.",
                            filterText: "for k, v in pairs",
                            preselect: true,
                            insertText: [
                                "for k, v in pairs(${1:dictionary}) do",
                                "\t$0",
                                "end"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "while true do",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Loop",
                            documentation: "Creates an infinite loop in a new thread since `true` is `true`. Includes a `wait()` and is wrapped in a coroutine to prevent the game from freezing up from overload.",
                            filterText: "while true",
                            preselect: true,
                            insertText: [
                                "coroutine.wrap(function()",
                                "\twhile true do",
                                "\t\t$0",
                                "\t\twait()",
                                "\tend",
                                "end)()"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "while wait() do",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Loop",
                            documentation: "Shorthand for\n\n```lua\ncoroutine.wrap(function()\n\twhile true do\n\t\twait()\n\tend\nend)()\n```\n\nalthough not using this is much more syntactically correct.",
                            filterText: "while wait",
                            insertText: [
                                "coroutine.wrap(function()",
                                "\twhile true do",
                                "\t\t$0",
                                "\t\twait()",
                                "\tend",
                                "end)()"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "method",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Method template for a class, which automatically defines the `self` variable which references the table.",
                            insertText: [
                                "function ${1:class}:${2:method}(${3:arguments})",
                                "\t$0",
                                "end"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "loadstring(http)",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Mostly for use in exploits, this snippet loads the Lua code from a website and executes it.",
                            insertText: "loadstring(game:HttpGet(\"${1:url}\"))()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "loadstring(rbx)",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Mostly for use in exploits, this snippet loads the Lua code from a Roblox Model and executes it.",
                            insertText: "loadstring(game:GetObjects(\"rbxassetid://${1:id}\")[1].Source)()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "benchmark",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Benchmark code to run for the performance of an operation.",
                            insertText: [
                                "local startTime = os.clock()",
                                "$0",
                                "local deltaTime = os.clock() - startTime"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "HUGE_VAL",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "The value which can only be used when returned from `math.huge`.",
                            insertText: "math.huge()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "INT32_MAX",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Autofills 2³² - 1.",
                            insertText: "2^32 - 1",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "INT32_MIN",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Autofills -2³² - 1.",
                            insertText: "-2^32 - 1",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Infinity",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Autofills 10 ^ 1000.",
                            insertText: "10^1000",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "math.e",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Uses `math.exp` and gets the power of e^1, which is just e.",
                            insertText: "math.exp(1)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "table.copy",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "A function that deep copies the contents of a given table, using a recusrive function. Not a real function of the `table` library.",
                            insertText: [
                                "local function ${1:name}(original)",
                                "\tlocal copy = {}",
                                "\tfor k, v in pairs(original) do",
                                "\t\tif type(v) == \"table\" then",
                                "\t\t\tv = ${1:name}(v)",
                                "\t\tend",
                                "\t\tcopy[k] = v",
                                "\tend",
                                "\treturn copy",
                                "end"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Class",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "A simple and accepted boilerplate template for custom objects. Not a real keyword or function.",
                            insertText: [
                                "local ${1:Class} = {}",
                                "${1:Class}.__index = ${1:Class}",
                                "",
                                "function ${1:Class}.new()",
                                "\tlocal ${2:Object} = setmetatable({}, ${1:Class})",
                                "\t$0",
                                "\treturn ${2:Object}",
                                "end"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "iterator",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Autofills a factory which returns an [iterator function](https://www.lua.org/pil/7.1.html), for use in a generic\n```lua\nfor ... in iterator() do\n\t\nend\n```",
                            insertText: [
                                "local function ${1:factory}(Table)",
                                "\tlocal State = 0",
                                "\treturn function()",
                                "\t\tState += 1",
                                "\t\t$0",
                                "\t\treturn Table[State]",
                                "\tend",
                                "end"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "tween",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "The code to create and start a tween.",
                            insertText: "game:GetService(\"TweenService\"):Create(${1:instance}, TweenInfo.new(${2:seconds}, Enum.EasingStyle.${3|Linear,Sine,Back,Quad,Quart,Quint,Bounce,Elastic,Exponential,Circular,Cubic|}, Enum.EasingDirection.${4|In,Out,InOut|}, ${5:repeats}, ${6:reverses}, 0), {$0}):Play()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "notify",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Notifies with the default Roblox GUI.",
                            insertText: [
                                "local Callback = Instance.new(\"BindableFunction\")",
                                "function Callback.OnInvoke(Button)",
                                "\t$0",
                                "end",
                                "game:GetService(\"StarterGui\"):SetCore(\"SendNotification\", {",
                                "\tTitle = \"$1\",",
                                "\tText = \"$2\",",
                                "\tIcon = \"$3\",",
                                "\tDuration = ${4:5},",
                                "\tCallback = Callback,",
                                "\tButton1 = \"$5\",",
                                "\tButton2 = \"$6\",",
                                "})",
                                "Callback:Destroy()"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "teleport",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Teleportation code using `TeleportService`.",
                            insertText: "game:GetService(\"TeleportService\"):Teleport(${1:place}, ${2:game.Players.LocalPlayer})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "pages",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            detail: "Snippet",
                            documentation: "Autofills a factory function `pages` which loops through a Pages instance with the returned iterator returning the `Item` and `PageNumber` in the current iteration.\n\n```lua\nfor v, i in pages(PagesInstance) do\n\t-- something\nend\n```",
                            insertText: [
                                "local function pages(Pages)",
                                "\treturn coroutine.wrap(function()",
                                "\t\tlocal Iteration = 1",
                                "\t\twhile true do",
                                "\t\t\tfor _, Item in ipairs(Pages:GetCurrentPage()) do",
                                "\t\t\t\tcoroutine.yield(Item, Iteration)",
                                "\t\t\tend",
                                "\t\t\tif Pages.IsFinished then",
                                "\t\t\t\tbreak",
                                "\t\t\tend",
                                "\t\t\tPages:AdvanceToNextPageAsync()",
                                "\t\t\tIteration += 1",
                                "\t\tend",
                                "\tend)",
                                "end"
                            ].join("\n"),
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }
                    ]
                };
            }
        });
        // Instance methods
        monaco.languages.registerCompletionItemProvider("lua", {
            triggerCharacters: [":"], provideCompletionItems: function () {
                return {
                    suggestions: [
                        {
                            label: "ClearAllChildren",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "This function destroys all of an Instance's children.",
                            filterText: ":ClearAllChildren()",
                            insertText: "ClearAllChildren()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Clone",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Create a copy of an object and all its descendants, ignoring objects that are not `Archivable`.",
                            filterText: ":Clone()",
                            insertText: "Clone()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Connect",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Method",
                            documentation: "Can be used when a given function should run every time an event fires. This function immediately returns a connection object. You should use an anonymous function if you don't already have a function declared.",
                            preselect: true,
                            filterText: ":Connect()",
                            insertText: "Connect($0)",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Destroy",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Sets the Instance.Parent property to nil, locks the Instance.Parent property, disconnects all connections and calls Destroy on all children.",
                            filterText: ":Destroy()",
                            insertText: "Destroy()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Disconnect",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Method",
                            documentation: "Used to disconnect `Connection()`s. Always use when a connection is no longer needed. This event is automatically called with `Destroy()`.",
                            filterText: ":Disconnect()",
                            insertText: "Disconnect()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "FindFirstAncestor",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the first ancestor of the Instance whose Instance.Name is equal to the given name.",
                            filterText: ":FindFirstAncestor()",
                            insertText: "FindFirstAncestor(${1:name})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "FindFirstAncestorOfClass",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the first ancestor of the Instance whose Instance.ClassName is equal to the given className.",
                            filterText: ":FindFirstAncestorOfClass()",
                            insertText: "FindFirstAncestorOfClass(${1:className})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "FindFirstAncestorWhichIsA",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the first ancestor of the Instance for whom Instance:IsA returns true for the given className.",
                            filterText: ":FindFirstAncestorWhichIsA()",
                            insertText: "FindFirstAncestorWhichIsA(${1:className})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "FindFirstChild",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the first child of the Instance found with the given name.",
                            filterText: ":FindFirstChild()",
                            insertText: "FindFirstChild(${1:name}, ${2:recursive})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "FindFirstChildOfClass",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the first child of the Instance whose ClassName is equal to the given className.",
                            filterText: ":FindFirstChildOfClass()",
                            insertText: "FindFirstChildOfClass(${1:className})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "FindFirstChildWhichIsA",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the first child of the Instance for whom Instance:IsA returns true for the given className.",
                            filterText: ":FindFirstChildWhichIsA()",
                            insertText: "FindFirstChildWhichIsA(${1:className}, ${2:recursive})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetActor",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "[TBA as of 1st April 2021. Go fork https://github.com/EthanMcBloxxer/Rosploco and propose the documentation to be added if it exists.]",
                            filterText: ":GetActor()",
                            insertText: "GetActor()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetAttribute",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the attribute which has been assigned to the given name.",
                            filterText: ":GetAttribute()",
                            insertText: "GetAttribute(${1:attribute})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetAttributeChangedSignal",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns an event that fires when the given attribute changes.",
                            filterText: ":GetAttributeChangedSignal()",
                            insertText: "GetAttributeChangedSignal(${1:attribute})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetAttributes",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns a dictionary of string → variant pairs for each of the Instance's attributes.",
                            filterText: ":GetAttributes()",
                            insertText: "GetAttributes()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetChildren",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns an array containing all of the Instance's children.",
                            filterText: ":GetChildren()",
                            insertText: "GetChildren()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetDebugId",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns a coded string of the Instances DebugId used internally by Roblox.",
                            filterText: ":GetDebugId()",
                            insertText: "GetDebugId(${1:scopeLength})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetDescendants",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns an array containing all of the descendants of the instance.",
                            filterText: ":GetDescendants()",
                            insertText: "GetDescendants()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetFullName",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns a string describing the Instance's ancestry.",
                            filterText: ":GetFullName()",
                            insertText: "GetFullName()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "GetPropertyChangedSignal",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Get an event that fires when a given property of an object changes.",
                            filterText: ":GetPropertyChangedSignal()",
                            insertText: "GetPropertyChangedSignal(${1:property})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "IsA",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns true if an Instance's class matches or inherits from a given class.",
                            filterText: ":IsA()",
                            insertText: "IsA(${1:className})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "IsAncestorOf",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns true if an Instance is an ancestor of the given descendant.",
                            filterText: ":IsAncestorOf()",
                            insertText: "IsAncestorOf(${1:descendant})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "IsDescendantOf",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns true if an Instance is a descendant of the given ancestor.",
                            filterText: ":IsDescendantOf()",
                            insertText: "IsDescendantOf(${1:ancestor})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Remove",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Sets the object's Parent to nil, and does the same for all its descendants.\n\nDeprecated in favor of :Destroy()",
                            filterText: ":Remove()",
                            tags: [monaco.languages.CompletionItemTag.Deprecated],
                            insertText: "Remove()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "SetAttribute",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Sets the attribute with the given name to the given value.",
                            filterText: "SetAttribute()",
                            insertText: "SetAttribute(${1:attribute}, ${2:value})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "WaitForChild",
                            kind: monaco.languages.CompletionItemKind.Method,
                            detail: "Method",
                            documentation: "Returns the child of the Instance with the given name. If the child does not exist, it will yield the current thread until it does.",
                            filterText: ":WaitForChild()",
                            insertText: "WaitForChild(${1:childName}, ${2:timeOut})",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Wait",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Method",
                            documentation: "Causes the script to pause until the event occurs once. When it does, the function returns the data associated with the event's firing.",
                            filterText: ":Wait()",
                            insertText: "Wait()",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }
                    ]
                };
            }
        });
        monaco.languages.registerCompletionItemProvider("lua", {
            triggerCharacters: ["."], provideCompletionItems: function () {
                return {
                    suggestions: [
                        /* Instance Properties */
                        {
                            label: "Archivable",
                            kind: monaco.languages.CompletionItemKind.Property,
                            detail: "Property",
                            documentation: "Determines if an Instance can be cloned using Instance:Clone or saved to file.",
                            insertText: "Archivable",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "ClassName",
                            kind: monaco.languages.CompletionItemKind.Property,
                            detail: "Property",
                            documentation: "A read-only string representing the class this Instance belongs to.",
                            insertText: "ClassName",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Name",
                            kind: monaco.languages.CompletionItemKind.Property,
                            detail: "Property",
                            documentation: "A non-unique identifier of the Instance.",
                            insertText: "Name",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Parent",
                            kind: monaco.languages.CompletionItemKind.Property,
                            detail: "Property",
                            documentation: "Determines the hierarchical parent of the Instance.",
                            insertText: "Parent",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "RobloxLocked",
                            kind: monaco.languages.CompletionItemKind.Property,
                            detail: "Property",
                            documentation: "A deprecated property that used to protect CoreGui objects.",
                            tags: [monaco.languages.CompletionItemTag.Deprecated],
                            insertText: "RobloxLocked",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        // Instance Events
                        {
                            label: "AncestryChanged",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Event",
                            documentation: "Fires when the Instance.Parent property of the object or one of its ancestors is changed.",
                            insertText: "AncestryChanged",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "AttributeChanged",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Event",
                            documentation: "Fires whenever an attribute is changed on the Instance.",
                            insertText: "AttributeChanged",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "Changed",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Event",
                            documentation: "Fired immediately after a property of an object changes.",
                            insertText: "Changed",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "ChildAdded",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Event",
                            documentation: "Fires when an object is parented to this Instance.",
                            insertText: "ChildAdded",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "ChildRemoved",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Event",
                            documentation: "Fires when a child is removed from this Instance.",
                            insertText: "ChildRemoved",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "DescendantAdded",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Event",
                            documentation: "Fires when a descendant is added to the Instance.",
                            insertText: "DescendantAdded",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: "DescendantRemoving",
                            kind: monaco.languages.CompletionItemKind.Event,
                            detail: "Event",
                            documentation: "Fires immediately before a descendant of the Instance is removed.",
                            insertText: "DescendantRemoving",
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }
                    ]
                };
            }
        });
    });
}
