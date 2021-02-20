import * as React from 'react';
import * as Permissions from 'expo-permissions';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import { Header } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type state = {
    hasCameraPermissions: any,
    scanned: boolean,
    scannedData: string,
    buttonState: string
}

type props = {

}

export default class ScanScreen extends React.Component<props, state> {
    constructor(props: state) {
        super(props);

        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: "",
            buttonState: 'normal'
        }
    }

    getCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: 'clicked',
            scanned: false
        })
    }

    handleBarCodeScanned = async (data: any) => {
        this.setState({
            scannedData: data,
            buttonState: 'normal',
            scanned: true
        })
    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if (buttonState === 'clicked' && hasCameraPermissions) {
            return (
                <SafeAreaProvider>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </SafeAreaProvider>
            )
        }
        else if (buttonState === 'normal') {
            return (
                <SafeAreaProvider>
                    <View style={{ marginTop: 25 }}>
                        <Header
                            centerComponent={{ text: 'Barcode Scanner', style: { fontSize: 20 } }}
                        />

                        <Image
                            style={{
                                width: 150,
                                height: 150,
                                margin: 25,
                                alignSelf: 'center'
                            }}
                            source={
                                require('../assets/img.jpg')
                            }
                        />

                        <Text style={{ fontSize: 20, alignSelf: 'center' }}>{
                            hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
                        }</Text>

                        <TouchableOpacity style={{ backgroundColor: 'cyan', margin: 20, padding: 15 }} onPress={this.getCameraPermissions}>
                            <Text style={{ fontSize: 20, alignSelf: 'center' }}>Scan QR code</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaProvider>
            );
        }
    }
}
