import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, hashHistory, withRouter } from "react-router"
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { tools } from "utils"
import { getRoute } from "./core"

export default class AppRouter extends React.Component {
    render() {
        const rootPath = "../views";
        const rootRoute = {
            path: "/",
            getComponent: (nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require("../views/layout.js").default)
                })
            },
            childRoutes: [
                //概要
                getRoute({
                    path: "overview",
                    getComponent: (nextState, cb) => {
                        require.ensure([], require => {
                            cb(null, require("../views/overview/overview.js").default)
                        })
                    }
                }),
                //账户
                getRoute({
                    path: "account",
                    childRoutes: [
                        getRoute({
                            path: "finance",
                            getComponent: (nextState, cb) => {
                                require.ensure([], require => {
                                    cb(null, require("../views/acount/finance.js").default)
                                })
                            }
                        }),
                        getRoute({
                            path: "personalInfo",
                            getComponent: (nextState, cb) => {
                                require.ensure([], require => {
                                    cb(null, require("../views/account/personalInfo.js").default)
                                })
                            }
                        }),
                        getRoute({
                            path: "changePwd",
                            getComponent: (nextState, cb) => {
                                require.ensure([], require => {
                                    cb(null, require("../views/account/changePwd.js").default)
                                })
                            }
                        })
                    ]
                })
            ]
        }

        const { store } = this.props;

        return (
            <Router
                history={hashHistory}
                onUpdate={this.onRouterUpload}
                routes={rootRoute} >
            </Router>
        )
    }

    onRouterUpload() {
        window.scrollTo(0, 0);
        tools.hideLoading();
    }
}