require 'test_helper'

class UserDetailsTest < ActiveSupport::TestCase
  test "age_group" do
    assert_equal(
      Poll::Age::GROUPING.key(Poll::Age::ALL),
      UserDetails.new.age_group)
    assert_equal(
      Poll::Age::GROUPING.key('5 - 10'),
      UserDetails.new(birth_date: (Time.now.to_date - 10.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('11 - 17'),
      UserDetails.new(birth_date: (Time.now.to_date - 17.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('18 - 29'),
      UserDetails.new(birth_date: (Time.now.to_date - 29.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('30 - 40'),
      UserDetails.new(birth_date: (Time.now.to_date - 40.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('41 - 50'),
      UserDetails.new(birth_date: (Time.now.to_date - 50.years)).age_group)
    assert_equal(
      Poll::Age::GROUPING.key('50+'),
      UserDetails.new(birth_date: (Time.now.to_date - 60.years)).age_group)
  end
end
