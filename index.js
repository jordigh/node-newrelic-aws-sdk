/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

/**
 * Allows users to `require('@newrelic/aws-sdk')` directly in their app. If they
 * for some reason choose to explicitly use an older version of our instrumentation
 * then the supportability metrics for custom instrumentation will trigger.
 */
const newrelic = require('newrelic')
newrelic.instrumentConglomerate('aws-sdk', require('./lib/instrumentation'))
newrelic.instrument({
  moduleName: '@aws-sdk/smithy-client',
  onResolved: require('./lib/smithy-client')
})
newrelic.instrumentMessages({
  moduleName: '@aws-sdk/client-sns',
  onResolved: require('./lib/v3-sns')
})
newrelic.instrumentMessages({
  moduleName: '@aws-sdk/client-dynamodb',
  onResolved: require('./lib/v3-dynamo-ddb')
})
