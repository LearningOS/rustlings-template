use assert_cmd::prelude::*;
use std::process::Command;

#[test]
fn check() {
    Command::cargo_bin("rustlings")
        .unwrap()
        .args(&["--nocapture","myverify"])
        // .current_dir("exercises/")
        .assert()
        .success()
        // .stdout("rust test 完成") // predicates::str::contains("总的题目数")
        ;
}
