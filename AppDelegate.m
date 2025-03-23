#import <GoogleMaps/GoogleMaps.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [GMSServices provideAPIKey:@"AIzaSyBX-RlkMIiyLQ-WxYTeLJL7FreXpGD1N8k"];
    return YES;
}
