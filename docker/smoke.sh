#!/bin/sh
# Environment smoke test — run after setup (and after any change you want to
# trust):  docker compose run --rm cli /smoke.sh
# Verifies the WordPress install, the Stanza stack, and the HTTP surface
# (front page, login page, admin auth-redirect). Exits non-zero on failure.
set -e

cd /var/www/html
FAILS=0

check() { # label, command...
    label="$1"; shift
    if "$@" > /dev/null 2>&1; then
        echo "OK   $label"
    else
        echo "FAIL $label"
        FAILS=$((FAILS+1))
    fi
}

http_expect() { # label, expected_code, url
    code=$(curl -s -o /dev/null -w '%{http_code}' "$3")
    if [ "$code" = "$2" ]; then
        echo "OK   $1 ($code)"
    else
        echo "FAIL $1 (got $code, want $2)"
        FAILS=$((FAILS+1))
    fi
}

check "WordPress installed"        wp core is-installed
check "stanza plugin active"       sh -c 'wp plugin get stanza --field=status | grep -qx active'
check "stanza-starter theme active" sh -c 'wp theme get stanza-starter --field=status | grep -qx active'
check "stanza blocks registered"   sh -c 'wp eval "exit(count(array_filter(array_keys(WP_Block_Type_Registry::get_instance()->get_all_registered()), fn(\$n) => str_starts_with(\$n, \"stanza/\"))) >= 20 ? 0 : 1);"'
check "no PHP fatals in debug.log" sh -c '! grep -q "PHP Fatal" wp-content/debug.log 2>/dev/null'

# HTTP surface (internal hostname; the wordpress container serves :80).
http_expect "front page"                  200 http://wordpress/
http_expect "login page"                  200 http://wordpress/wp-login.php
http_expect "wp-admin redirects to login" 302 http://wordpress/wp-admin/

check "front page renders a stanza block" sh -c 'curl -s http://wordpress/ | grep -q wp-block-stanza'
check "no notices leak into HTML"         sh -c '! curl -s http://wordpress/ | grep -qE "Deprecated:|Warning:|Fatal error"'

echo ""
if [ "$FAILS" -gt 0 ]; then
    echo "$FAILS check(s) FAILED"
    exit 1
fi
echo "All checks passed."
