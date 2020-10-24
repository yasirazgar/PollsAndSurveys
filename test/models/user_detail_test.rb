require 'test_helper'

class UserDetailTest < ActiveSupport::TestCase
  test "age_group" do
    options(:python)
    assert_equal(
      Poll::Age::GROUPING.key(Poll::Age::ALL),
      UserDetail.new.age_group)
    assert_equal(
      Poll::Age::GROUPING.key('5 - 10'),
      UserDetail.new(birth_date: (Time.now.to_date - 10.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('11 - 17'),
      UserDetail.new(birth_date: (Time.now.to_date - 17.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('18 - 29'),
      UserDetail.new(birth_date: (Time.now.to_date - 29.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('30 - 40'),
      UserDetail.new(birth_date: (Time.now.to_date - 40.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('41 - 50'),
      UserDetail.new(birth_date: (Time.now.to_date - 50.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('50+'),
      UserDetail.new(birth_date: (Time.now.to_date - 60.years)).age_group)
  end
end
