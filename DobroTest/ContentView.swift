//
//  ContentView.swift
//  DobroTest
//
//  Created by Samuel Kebis on 05/07/2025.
//

import SwiftUI
import WebKit

struct ContentView: View {
    var body: some View {
        LocalWebView(fileName: "prayers/index", fileExtension: "html")
            .background(Color.blue.ignoresSafeArea())
    }
}

struct LocalWebView: UIViewRepresentable {
    let fileName: String
    let fileExtension: String

    func makeUIView(context: Context) -> WKWebView {
        return WKWebView()
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        if let fileURL = Bundle.main.url(forResource: fileName, withExtension: fileExtension) {
            // Allow read access to the bundle folder
            webView.loadFileURL(fileURL, allowingReadAccessTo: fileURL.deletingLastPathComponent())
        } else {
            print("⚠️ File not found: \(fileName).\(fileExtension)")
        }
    }
}

struct WebView: UIViewRepresentable {
    let url: URL
    

    var webView: WKWebView!
    var backButton: UIBarButtonItem!

    func makeUIView(context: Context) -> WKWebView {
        let view = WKWebView()
        view.allowsBackForwardNavigationGestures = true
        return view
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        let request = URLRequest(url: url)
        uiView.load(request)
    }
}

#Preview {
    ContentView()
}
